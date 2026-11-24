/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';

/**
 * Procedural texture generator for KenyaOne 3D environments.
 * 100% generated with HTML5 Canvas & Three.js DataTexture — zero external 404 dependencies.
 */

// Cached procedural textures
let savannahTerrainTex: THREE.CanvasTexture | null = null;
let sandBeachTex: THREE.CanvasTexture | null = null;
let giraffePatternTex: THREE.CanvasTexture | null = null;
let zebraPatternTex: THREE.CanvasTexture | null = null;
let woodBarkTex: THREE.CanvasTexture | null = null;

export function getSavannahTerrainTexture(): THREE.CanvasTexture {
  if (savannahTerrainTex) return savannahTerrainTex;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base warm golden ochre savannah soil
  ctx.fillStyle = '#9C7A4A';
  ctx.fillRect(0, 0, 512, 512);

  // Mottled dry grass clumps and earth speckles
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = Math.random() * 4 + 1;
    const r = Math.floor(160 + Math.random() * 60);
    const g = Math.floor(130 + Math.random() * 50);
    const b = Math.floor(60 + Math.random() * 30);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.15 + Math.random() * 0.25})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine straw grass blades
  ctx.strokeStyle = 'rgba(217, 179, 107, 0.4)';
  ctx.lineWidth = 1.2;
  for (let j = 0; j < 600; j++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 12, y - Math.random() * 15 - 4);
    ctx.stroke();
  }

  savannahTerrainTex = new THREE.CanvasTexture(canvas);
  savannahTerrainTex.wrapS = THREE.RepeatWrapping;
  savannahTerrainTex.wrapT = THREE.RepeatWrapping;
  savannahTerrainTex.repeat.set(16, 16);
  savannahTerrainTex.colorSpace = THREE.SRGBColorSpace;
  return savannahTerrainTex;
}

export function getSandBeachTexture(): THREE.CanvasTexture {
  if (sandBeachTex) return sandBeachTex;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#F4EDE0'; // Soft Diani white coral sand
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const alpha = 0.08 + Math.random() * 0.12;
    ctx.fillStyle = `rgba(215, 195, 170, ${alpha})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  sandBeachTex = new THREE.CanvasTexture(canvas);
  sandBeachTex.wrapS = THREE.RepeatWrapping;
  sandBeachTex.wrapT = THREE.RepeatWrapping;
  sandBeachTex.repeat.set(24, 24);
  sandBeachTex.colorSpace = THREE.SRGBColorSpace;
  return sandBeachTex;
}

export function getGiraffePatternTexture(): THREE.CanvasTexture {
  if (giraffePatternTex) return giraffePatternTex;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Warm cream background
  ctx.fillStyle = '#EBD5AF';
  ctx.fillRect(0, 0, 256, 256);

  // Reticulated irregular polygonal patches
  ctx.fillStyle = '#7C3F1B';
  const gridSize = 32;
  for (let x = 0; x < 256; x += gridSize) {
    for (let y = 0; y < 256; y += gridSize) {
      const margin = 4;
      const w = gridSize - margin * 2;
      const h = gridSize - margin * 2;
      ctx.beginPath();
      ctx.roundRect(x + margin + (Math.random() - 0.5) * 2, y + margin + (Math.random() - 0.5) * 2, w, h, 6);
      ctx.fill();
    }
  }

  giraffePatternTex = new THREE.CanvasTexture(canvas);
  giraffePatternTex.wrapS = THREE.RepeatWrapping;
  giraffePatternTex.wrapT = THREE.RepeatWrapping;
  giraffePatternTex.repeat.set(2, 4);
  giraffePatternTex.colorSpace = THREE.SRGBColorSpace;
  return giraffePatternTex;
}

export function getZebraPatternTexture(): THREE.CanvasTexture {
  if (zebraPatternTex) return zebraPatternTex;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#F8F8F8';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#18181B';
  for (let y = 0; y < 256; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(80, y + 10, 160, y - 8, 256, y + 4);
    ctx.lineTo(256, y + 14);
    ctx.bezierCurveTo(160, y + 2, 80, y + 20, 0, y + 12);
    ctx.closePath();
    ctx.fill();
  }

  zebraPatternTex = new THREE.CanvasTexture(canvas);
  zebraPatternTex.wrapS = THREE.RepeatWrapping;
  zebraPatternTex.wrapT = THREE.RepeatWrapping;
  zebraPatternTex.repeat.set(2, 3);
  zebraPatternTex.colorSpace = THREE.SRGBColorSpace;
  return zebraPatternTex;
}

export function getWoodBarkTexture(): THREE.CanvasTexture {
  if (woodBarkTex) return woodBarkTex;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#422817';
  ctx.fillRect(0, 0, 128, 256);

  ctx.strokeStyle = '#2B170B';
  ctx.lineWidth = 2;
  for (let x = 0; x < 128; x += 6) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (Math.random() - 0.5) * 8, 256);
    ctx.stroke();
  }

  woodBarkTex = new THREE.CanvasTexture(canvas);
  woodBarkTex.wrapS = THREE.RepeatWrapping;
  woodBarkTex.wrapT = THREE.RepeatWrapping;
  woodBarkTex.colorSpace = THREE.SRGBColorSpace;
  return woodBarkTex;
}
