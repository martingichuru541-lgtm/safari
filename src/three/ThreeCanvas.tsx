/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  createAcaciaTree,
  createSafariCruiser,
  createAfricanElephant,
  createGiraffe,
  createFlamingo,
  createSwahiliDhow,
  createLuxurySafariCamp,
} from './models/SafariModels';
import {
  getSavannahTerrainTexture,
  getSandBeachTexture,
} from './ProceduralTextures';
import { safariAudio } from '../utils/soundscape';

interface ThreeCanvasProps {
  currentSceneIndex: number;
  onSceneChange?: (index: number) => void;
  onExploreMarketplace?: () => void;
}

export const SCENE_NAMES = [
  'Maasai Mara Sunrise',
  'Amboseli & Kilimanjaro',
  'Nairobi Skyline & Wilds',
  'Lake Nakuru Flamingos',
  'Samburu Arid Frontier',
  'Mount Kenya Alpine',
  'Kenyan Coral Coast',
  'Underwater Marine Reef',
  'Luxury Safari Lodge',
  'Safari 4x4 Expedition'
];

export const SCENE_DESCRIPTIONS = [
  'Golden sunrise over the vast savannah with wandering wildlife and acacia trees.',
  'Giant tuskers roaming open plains beneath the snowy crown of Mount Kilimanjaro.',
  'Endangered black rhinos and giraffes grazing with Nairobi’s modern glass skyline.',
  'Thousands of pink flamingos gathering along the alkaline waters of the Rift Valley.',
  'Untamed northern landscapes along the palm-fringed Ewaso Nyiro River.',
  'Dramatic equatorial peaks, afro-alpine lobelias, and sacred mist-veiled ridges.',
  'Powdery white sands of Diani Beach, turquoise warm ocean, and Swahili dhows.',
  'Vibrant protected coral gardens, manta rays, and tropical fish at Watamu Marine Park.',
  'High-end tented suites, sunset boma campfire, and untamed luxury under African stars.',
  'Custom heavy-duty 4x4 Land Cruiser engineered for cross-country exploration.'
];

// Pre-allocated reusable math vectors (Zero GC in loop)
const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  currentSceneIndex,
  onSceneChange,
  onExploreMarketplace,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeSceneRef = useRef(currentSceneIndex);
  activeSceneRef.current = currentSceneIndex;

  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'noon' | 'sunset' | 'night'>('dawn');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  const timeOfDayRef = useRef(timeOfDay);
  timeOfDayRef.current = timeOfDay;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setIsZenMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Automatic guided tour timer
  useEffect(() => {
    if (!isPlayingTour) return;
    const interval = setInterval(() => {
      const next = (activeSceneRef.current + 1) % SCENE_NAMES.length;
      onSceneChange?.(next);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlayingTour, onSceneChange]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL safely
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Modern Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF59E0B); // Warm sunrise base
    scene.fog = new THREE.FogExp2(0xF59E0B, 0.015);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 400);
    camera.position.set(0, 14, 30);
    camera.lookAt(0, 2, 0);

    // 4. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    const sunLight = new THREE.DirectionalLight(0xFFF1D0, 2.8);
    sunLight.position.set(35, 45, 25);
    sunLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.bias = -0.0005;
      sunLight.shadow.camera.near = 0.5;
      sunLight.shadow.camera.far = 120;
      sunLight.shadow.camera.left = -25;
      sunLight.shadow.camera.right = 25;
      sunLight.shadow.camera.top = 25;
      sunLight.shadow.camera.bottom = -25;
    }
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0xFDE68A, 0x3F2E1E, 1.2);
    scene.add(hemiLight);

    // 6. Universal Base Terrain
    const groundGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      roughness: 0.85,
      metalness: 0.05,
      map: getSavannahTerrainTexture(),
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = !isSoftwareGl;
    scene.add(groundMesh);

    // 7. Water Plane (for Nakuru and Coastal scenes)
    const waterGeo = new THREE.PlaneGeometry(140, 140, 16, 16);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0EA5E9,
      roughness: 0.12,
      metalness: 0.35,
      transparent: true,
      opacity: 0.82,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 0.15;
    waterMesh.visible = false;
    scene.add(waterMesh);

    // 8. Distant Mountains (Kilimanjaro & Mt Kenya)
    const mountainGroup = new THREE.Group();
    // Kilimanjaro dome
    const kiliGeo = new THREE.ConeGeometry(38, 24, 20);
    const kiliMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.8,
      flatShading: true,
    });
    const kili = new THREE.Mesh(kiliGeo, kiliMat);
    kili.position.set(0, 8, -75);
    // Snow cap
    const snowGeo = new THREE.ConeGeometry(12, 7.5, 16);
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
    const snowCap = new THREE.Mesh(snowGeo, snowMat);
    snowCap.position.set(0, 16.5, -75);
    mountainGroup.add(kili, snowCap);
    scene.add(mountainGroup);

    // 9. Nairobi Distant Skyline Group
    const skylineGroup = new THREE.Group();
    for (let i = -6; i <= 6; i++) {
      const bh = 8 + Math.abs(i * 1.5) + (i % 2) * 5;
      const bGeo = new THREE.BoxGeometry(2.5, bh, 2.5);
      const bMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x334155 : 0x1E293B,
        roughness: 0.3,
        metalness: 0.7,
      });
      const tower = new THREE.Mesh(bGeo, bMat);
      tower.position.set(i * 3.8, bh / 2, -60);
      skylineGroup.add(tower);
    }
    skylineGroup.visible = false;
    scene.add(skylineGroup);

    // 10. Dust & Atmosphere Particle System
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = Math.random() * 16 + 0.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFDE68A,
      size: 0.35,
      transparent: true,
      opacity: 0.5,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // 11. Coordinated 3D Scene Actors
    const actorsGroup = new THREE.Group();
    scene.add(actorsGroup);

    // Mara Trees
    const acacia1 = createAcaciaTree(1.2);
    acacia1.position.set(-12, 0, -6);
    const acacia2 = createAcaciaTree(0.9);
    acacia2.position.set(16, 0, -14);
    const acacia3 = createAcaciaTree(0.7);
    acacia3.position.set(5, 0, -22);
    actorsGroup.add(acacia1, acacia2, acacia3);

    // Safari Vehicle
    const cruiser = createSafariCruiser();
    cruiser.position.set(0, 0, 4);
    cruiser.rotation.y = 0.3;
    actorsGroup.add(cruiser);

    // Elephants (Amboseli)
    const elephantParent = createAfricanElephant(1.1);
    elephantParent.position.set(-6, 0, -2);
    elephantParent.rotation.y = 0.5;

    const elephantCalf = createAfricanElephant(0.55);
    elephantCalf.position.set(-2, 0, -0.5);
    elephantCalf.rotation.y = 0.4;
    actorsGroup.add(elephantParent, elephantCalf);

    // Giraffes (Nairobi / Samburu)
    const giraffe1 = createGiraffe(0.95);
    giraffe1.position.set(9, 0, -4);
    giraffe1.rotation.y = -0.4;
    actorsGroup.add(giraffe1);

    // Flamingos (Lake Nakuru)
    const flamingosGroup = new THREE.Group();
    for (let i = 0; i < 24; i++) {
      const f = createFlamingo(0.85);
      f.position.set((Math.random() - 0.5) * 22, 0, (Math.random() - 0.5) * 12 - 4);
      f.rotation.y = Math.random() * Math.PI * 2;
      flamingosGroup.add(f);
    }
    flamingosGroup.visible = false;
    actorsGroup.add(flamingosGroup);

    // Swahili Dhow (Coast)
    const dhow = createSwahiliDhow(1.2);
    dhow.position.set(0, 0, -8);
    dhow.rotation.y = 0.6;
    dhow.visible = false;
    actorsGroup.add(dhow);

    // Luxury Safari Camp & Boma Firepit (Lodge)
    const lodge = createLuxurySafariCamp();
    lodge.position.set(0, 0, -5);
    lodge.visible = false;
    actorsGroup.add(lodge);

    // 12. Dynamic Environment & Camera Presets
    const updateSceneActors = (index: number) => {
      // Visibility toggles
      acacia1.visible = [0, 1, 2, 4, 8].includes(index);
      acacia2.visible = [0, 1, 2, 4, 8].includes(index);
      acacia3.visible = [0, 1, 2, 4, 8].includes(index);
      elephantParent.visible = [0, 1, 4].includes(index);
      elephantCalf.visible = [0, 1, 4].includes(index);
      giraffe1.visible = [0, 2, 4].includes(index);
      cruiser.visible = [0, 2, 8, 9].includes(index);
      flamingosGroup.visible = index === 3;
      dhow.visible = [6, 7].includes(index);
      lodge.visible = index === 8;
      waterMesh.visible = [3, 6, 7].includes(index);
      mountainGroup.visible = [1, 5].includes(index);
      skylineGroup.visible = index === 2;

      // Surface material swap for coastal beach
      if (index === 6 || index === 7) {
        groundMesh.material = new THREE.MeshStandardMaterial({
          roughness: 0.9,
          map: getSandBeachTexture(),
        });
        waterMesh.material = new THREE.MeshStandardMaterial({
          color: index === 7 ? 0x0284C7 : 0x06B6D4,
          roughness: 0.08,
          metalness: 0.45,
          transparent: true,
          opacity: index === 7 ? 0.92 : 0.78,
        });
      } else {
        groundMesh.material = groundMat;
      }

      // Camera target positions
      switch (index) {
        case 0: // Maasai Mara Sunrise
          _targetPos.set(0, 12, 28);
          _targetLook.set(0, 2, 0);
          break;
        case 1: // Amboseli & Kilimanjaro
          _targetPos.set(-8, 8, 24);
          _targetLook.set(-3, 4, -40);
          break;
        case 2: // Nairobi National Park
          _targetPos.set(4, 7, 22);
          _targetLook.set(0, 4, -30);
          break;
        case 3: // Lake Nakuru
          _targetPos.set(0, 6, 18);
          _targetLook.set(0, 1, -8);
          break;
        case 4: // Samburu Arid Frontier
          _targetPos.set(6, 9, 24);
          _targetLook.set(2, 3, -4);
          break;
        case 5: // Mount Kenya Alpine
          _targetPos.set(0, 14, 32);
          _targetLook.set(0, 10, -50);
          break;
        case 6: // Kenyan Coast
          _targetPos.set(-6, 7, 20);
          _targetLook.set(0, 2, -6);
          break;
        case 7: // Underwater Marine
          _targetPos.set(0, 2.5, 12);
          _targetLook.set(0, 1, -8);
          break;
        case 8: // Luxury Safari Camp
          _targetPos.set(8, 6, 14);
          _targetLook.set(1, 2, -2);
          break;
        case 9: // Safari Cruiser Exploration
          _targetPos.set(4, 3.2, 10);
          _targetLook.set(0, 1.8, 4);
          break;
        default:
          _targetPos.set(0, 12, 28);
          _targetLook.set(0, 2, 0);
      }
    };

    // 13. Lighting and Palette Sync based on Time of Day
    const updateTimeOfDayLighting = () => {
      const time = timeOfDayRef.current;
      const idx = activeSceneRef.current;

      let skyHex = 0xF59E0B;
      let sunIntensity = 2.8;
      let hemiHexSky = 0xFDE68A;
      let hemiHexGround = 0x3F2E1E;

      if (time === 'noon') {
        skyHex = idx === 6 || idx === 7 ? 0x38BDF8 : 0x7DD3FC;
        sunIntensity = 3.6;
        hemiHexSky = 0xE0F2FE;
        hemiHexGround = 0x78716C;
      } else if (time === 'sunset') {
        skyHex = 0xEA580C;
        sunIntensity = 2.2;
        hemiHexSky = 0xFDBA74;
        hemiHexGround = 0x431407;
      } else if (time === 'night') {
        skyHex = 0x090D16;
        sunIntensity = 0.4;
        hemiHexSky = 0x1E293B;
        hemiHexGround = 0x05070B;
      }

      if (idx === 7) {
        // Underwater special mood
        skyHex = 0x0369A1;
        sunIntensity = 1.4;
      }

      scene.background = new THREE.Color(skyHex);
      scene.fog = new THREE.FogExp2(skyHex, idx === 7 ? 0.035 : 0.014);
      sunLight.intensity = sunIntensity;
      hemiLight.color.setHex(hemiHexSky);
      hemiLight.groundColor.setHex(hemiHexGround);
    };

    // 14. Render Loop with Exponential Damping & Software GL Guard
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const currentLook = new THREE.Vector3(0, 2, 0);

    function tick() {
      const dt = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Check scene update
      updateSceneActors(activeSceneRef.current);
      updateTimeOfDayLighting();

      // Smooth camera interpolation with exponential damping
      const dampFactor = 1 - Math.exp(-2.5 * dt);
      camera.position.lerp(_targetPos, dampFactor);
      currentLook.lerp(_targetLook, dampFactor);
      camera.lookAt(currentLook);

      // Subtle dynamic animations
      // 1. Gently animate dust particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 1.2 + i) * 0.015;
        if (positions[i * 3 + 1] > 20) positions[i * 3 + 1] = 0.5;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // 2. Dhow boat gentle wave roll
      if (dhow.visible) {
        dhow.position.y = Math.sin(elapsedTime * 1.5) * 0.18;
        dhow.rotation.z = Math.sin(elapsedTime * 1.2) * 0.06;
      }

      // 3. Gentle water oscillation
      if (waterMesh.visible) {
        waterMesh.position.y = 0.15 + Math.sin(elapsedTime * 1.4) * 0.04;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }
    tick();

    // 15. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleAudioToggle = () => {
    const isPlaying = safariAudio.toggle();
    setIsAudioActive(isPlaying);
    // sync mode with scene
    if (currentSceneIndex === 6 || currentSceneIndex === 7) {
      safariAudio.setMode('ocean');
    } else {
      safariAudio.setMode(timeOfDay === 'night' ? 'night' : 'savannah');
    }
  };

  const handleTimeChange = (time: 'dawn' | 'noon' | 'sunset' | 'night') => {
    setTimeOfDay(time);
    timeOfDayRef.current = time;
    if (isAudioActive) {
      if (currentSceneIndex === 6 || currentSceneIndex === 7) {
        safariAudio.setMode('ocean');
      } else {
        safariAudio.setMode(time === 'night' ? 'night' : 'savannah');
      }
    }
  };

  return (
    <div className="relative w-full h-[85vh] min-h-[580px] max-h-[920px] bg-stone-950 overflow-hidden select-none">
      {/* 1. Stable WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        data-testid="three-canvas-viewport"
        className="absolute inset-0 w-full h-full"
      />

      {/* 2. Minimal Top-Left Title Badge (Non-occluding) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 text-stone-100 border border-amber-500/30 text-xs font-medium tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Interactive 3D Cinema</span>
          <span className="text-stone-400">•</span>
          <span className="text-amber-300 font-semibold">{SCENE_NAMES[currentSceneIndex]}</span>
        </div>
      </div>

      {/* 3. Top-Right Audio & Tour Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          type="button"
          onClick={handleAudioToggle}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isAudioActive
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
              : 'bg-stone-900/90 text-stone-300 hover:text-white border border-stone-800'
          }`}
          aria-label={isAudioActive ? 'Mute African Soundscape' : 'Enable African Soundscape Audio'}
        >
          <span>{isAudioActive ? 'Sound: On' : 'Sound: Off'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPlayingTour(!isPlayingTour)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isPlayingTour
              ? 'bg-amber-600 text-white shadow-lg'
              : 'bg-stone-900/90 text-stone-300 hover:text-white border border-stone-800'
          }`}
          aria-label={isPlayingTour ? 'Pause Guided Tour' : 'Play Guided Tour'}
        >
          <span>{isPlayingTour ? 'Tour: Auto' : 'Tour: Manual'}</span>
        </button>
      </div>

      {/* 4. Cinematic Overlay Story Card (Centered, Non-blocking) */}
      {!isZenMode && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 text-center max-w-2xl px-4 pointer-events-none transition-all">
          <p className="text-amber-400 font-semibold tracking-widest text-xs uppercase drop-shadow-md">
            KenyaOne Living Environments
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mt-1 font-serif">
            {SCENE_NAMES[currentSceneIndex]}
          </h1>
          <p className="text-stone-200 text-sm sm:text-base mt-2 drop-shadow-md line-clamp-2 max-w-xl mx-auto font-light">
            {SCENE_DESCRIPTIONS[currentSceneIndex]}
          </p>
        </div>
      )}

      {/* 5. Viewport-First Collapsible Bottom Control Dock (< 15% footprint) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[920px] transition-transform duration-300 ${
          isZenMode ? 'translate-y-[calc(100%-28px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-px">
          <button
            type="button"
            onClick={() => setIsZenMode(!isZenMode)}
            className="px-4 py-1 rounded-t-lg bg-stone-900 text-stone-300 hover:text-amber-400 text-xs font-medium border-t border-x border-stone-800 tracking-wide transition-colors"
            aria-label={isZenMode ? 'Expand 3D Controls' : 'Hide Controls (Zen Cinema Mode)'}
          >
            {isZenMode ? '▴ Show 3D Controls (H)' : '▾ Zen Cinema Mode (H)'}
          </button>
        </div>

        {/* Unified Bottom Dock Surface (Solid rgba, no heavy backdrop-filter over WebGL) */}
        <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-3 shadow-2xl text-stone-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Scene Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {SCENE_NAMES.map((name, idx) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => onSceneChange?.(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    currentSceneIndex === idx
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'bg-stone-800/80 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Time of Day & Action Dock */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-800">
              <div className="flex items-center gap-1 bg-stone-950/80 p-1 rounded-lg border border-stone-800 text-xs">
                {(['dawn', 'noon', 'sunset', 'night'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTimeChange(t)}
                    className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                      timeOfDay === t
                        ? 'bg-stone-800 text-amber-400'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {onExploreMarketplace && (
                <button
                  type="button"
                  onClick={onExploreMarketplace}
                  className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-lg text-xs tracking-wide shadow-md transition-all uppercase"
                >
                  Explore Stays &amp; Safaris →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
