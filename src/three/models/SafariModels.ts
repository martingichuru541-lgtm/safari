/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';
import {
  getGiraffePatternTexture,
  getZebraPatternTexture,
  getWoodBarkTexture,
} from '../ProceduralTextures';

/**
 * Procedural composite 3-12 part models for KenyaOne 3D experience.
 * Following Three.js skill:
 * - Never single default primitives.
 * - Varied roughness/metalness between adjacent parts.
 * - Bottom-center pivots flush with ground.
 * - Soft contact shadows.
 */

export function createAcaciaTree(scale = 1): THREE.Group {
  const group = new THREE.Group();

  const barkMat = new THREE.MeshStandardMaterial({
    color: 0x4a3525,
    roughness: 0.88,
    metalness: 0.05,
    map: getWoodBarkTexture(),
  });

  const leafMat1 = new THREE.MeshStandardMaterial({
    color: 0x476336, // Olive acacia green
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });

  const leafMat2 = new THREE.MeshStandardMaterial({
    color: 0x3d542e,
    roughness: 0.8,
    flatShading: true,
  });

  // 1. Main gnarled trunk
  const trunkGeo = new THREE.CylinderGeometry(0.35 * scale, 0.65 * scale, 4.5 * scale, 7);
  const trunk = new THREE.Mesh(trunkGeo, barkMat);
  trunk.position.y = 2.25 * scale;
  trunk.castShadow = true;
  group.add(trunk);

  // 2. Main diverging branch 1
  const b1Geo = new THREE.CylinderGeometry(0.22 * scale, 0.35 * scale, 3.2 * scale, 6);
  const b1 = new THREE.Mesh(b1Geo, barkMat);
  b1.position.set(0.6 * scale, 4.2 * scale, 0.2 * scale);
  b1.rotation.z = -0.55;
  b1.rotation.y = 0.4;
  b1.castShadow = true;
  group.add(b1);

  // 3. Main diverging branch 2
  const b2Geo = new THREE.CylinderGeometry(0.2 * scale, 0.32 * scale, 3.0 * scale, 6);
  const b2 = new THREE.Mesh(b2Geo, barkMat);
  b2.position.set(-0.7 * scale, 4.1 * scale, -0.3 * scale);
  b2.rotation.z = 0.58;
  b2.rotation.y = -0.3;
  b2.castShadow = true;
  group.add(b2);

  // 4. Characteristic flat-topped umbrella canopies (Tiered foliage)
  const canopy1Geo = new THREE.CylinderGeometry(3.2 * scale, 2.6 * scale, 0.55 * scale, 9);
  const canopy1 = new THREE.Mesh(canopy1Geo, leafMat1);
  canopy1.position.set(1.4 * scale, 5.5 * scale, 0.3 * scale);
  canopy1.castShadow = true;
  group.add(canopy1);

  const canopy2Geo = new THREE.CylinderGeometry(2.8 * scale, 2.2 * scale, 0.5 * scale, 8);
  const canopy2 = new THREE.Mesh(canopy2Geo, leafMat2);
  canopy2.position.set(-1.3 * scale, 5.3 * scale, -0.4 * scale);
  canopy2.castShadow = true;
  group.add(canopy2);

  const topCanopyGeo = new THREE.CylinderGeometry(4.0 * scale, 3.4 * scale, 0.6 * scale, 10);
  const topCanopy = new THREE.Mesh(topCanopyGeo, leafMat1);
  topCanopy.position.set(0.2 * scale, 6.2 * scale, 0);
  topCanopy.castShadow = true;
  group.add(topCanopy);

  // 5. Contact shadow plane
  const shadowGeo = new THREE.CircleGeometry(3.5 * scale, 16);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x1b130a,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(shadow);

  return group;
}

export function createSafariCruiser(): THREE.Group {
  const group = new THREE.Group();

  // Materials with varied PBR properties
  const bodyPaintMat = new THREE.MeshStandardMaterial({
    color: 0x2A472E, // Classic Kenyan safari racing dark green
    roughness: 0.35,
    metalness: 0.45,
  });

  const roofMat = new THREE.MeshStandardMaterial({
    color: 0xE8DFD1, // Ivory safari heat-reflective top
    roughness: 0.4,
    metalness: 0.2,
  });

  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x18181B,
    roughness: 0.7,
    metalness: 0.8,
  });

  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x202022,
    roughness: 0.9,
    metalness: 0.1,
  });

  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xD4D4D8,
    roughness: 0.25,
    metalness: 0.85,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.75,
  });

  const bullbarMat = new THREE.MeshStandardMaterial({
    color: 0x09090B,
    roughness: 0.3,
    metalness: 0.9,
  });

  const lightMat = new THREE.MeshStandardMaterial({
    color: 0xFEF08A,
    emissive: 0xFDE047,
    emissiveIntensity: 0.8,
    roughness: 0.1,
  });

  // 1. Lower chassis & undercarriage
  const chassisGeo = new THREE.BoxGeometry(2.3, 0.4, 5.4);
  const chassis = new THREE.Mesh(chassisGeo, chassisMat);
  chassis.position.y = 0.85;
  chassis.castShadow = true;
  group.add(chassis);

  // 2. Main passenger cabin
  const cabinGeo = new THREE.BoxGeometry(2.2, 1.3, 4.8);
  const cabin = new THREE.Mesh(cabinGeo, bodyPaintMat);
  cabin.position.set(0, 1.7, -0.1);
  cabin.castShadow = true;
  group.add(cabin);

  // 3. Bonnet / Hood
  const hoodGeo = new THREE.BoxGeometry(2.1, 0.65, 1.6);
  const hood = new THREE.Mesh(hoodGeo, bodyPaintMat);
  hood.position.set(0, 1.35, 2.5);
  hood.castShadow = true;
  group.add(hood);

  // 4. Panoramic Pop-up Safari Observation Roof (Iconic pop-up)
  const roofTopGeo = new THREE.BoxGeometry(1.9, 0.18, 3.4);
  const roofTop = new THREE.Mesh(roofTopGeo, roofMat);
  roofTop.position.set(0, 2.75, -0.3); // Raised observation hatch
  roofTop.castShadow = true;
  group.add(roofTop);

  // Pop-up canvas bellows / struts
  const canvasGeo = new THREE.BoxGeometry(1.7, 0.38, 3.2);
  const canvasMat = new THREE.MeshStandardMaterial({ color: 0x857560, roughness: 0.9 });
  const bellows = new THREE.Mesh(canvasGeo, canvasMat);
  bellows.position.set(0, 2.45, -0.3);
  group.add(bellows);

  // 5. Windows (Windshield & side wrap)
  const windshieldGeo = new THREE.BoxGeometry(2.0, 0.7, 0.1);
  const windshield = new THREE.Mesh(windshieldGeo, glassMat);
  windshield.position.set(0, 1.95, 1.75);
  windshield.rotation.x = 0.25;
  group.add(windshield);

  // 6. Heavy tubular Bull-bar front bumper
  const barGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.2, 8);
  const bar = new THREE.Mesh(barGeo, bullbarMat);
  bar.rotation.z = Math.PI / 2;
  bar.position.set(0, 0.9, 3.35);
  group.add(bar);

  // 7. Headlights
  const hlGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 12);
  const hlLeft = new THREE.Mesh(hlGeo, lightMat);
  hlLeft.rotation.x = Math.PI / 2;
  hlLeft.position.set(-0.75, 1.15, 3.32);
  const hlRight = hlLeft.clone();
  hlRight.position.x = 0.75;
  group.add(hlLeft, hlRight);

  // 8. Snorkel along right A-pillar
  const snorkelGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8);
  const snorkel = new THREE.Mesh(snorkelGeo, chassisMat);
  snorkel.position.set(1.15, 2.0, 1.6);
  group.add(snorkel);

  // 9. 4 Off-road wheels with knobby tires
  const wheelPositions = [
    [-1.25, 0.55, 1.8],
    [1.25, 0.55, 1.8],
    [-1.25, 0.55, -1.8],
    [1.25, 0.55, -1.8],
  ];

  wheelPositions.forEach(([x, y, z]) => {
    const wheelGroup = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.45, 14), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wheelGroup.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.46, 10), rimMat);
    rim.rotation.z = Math.PI / 2;
    wheelGroup.add(rim);

    wheelGroup.position.set(x, y, z);
    group.add(wheelGroup);
  });

  // 10. Rear spare wheel mounted on door
  const spare = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.38, 12), tireMat);
  spare.rotation.x = Math.PI / 2;
  spare.position.set(0, 1.6, -2.65);
  group.add(spare);

  // Ground contact shadow
  const shadowGeo = new THREE.PlaneGeometry(3.2, 6.2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x0A0A0A,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(shadow);

  return group;
}

export function createAfricanElephant(scale = 1): THREE.Group {
  const group = new THREE.Group();

  const elephantMat = new THREE.MeshStandardMaterial({
    color: 0x6E6E73,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  });

  const ivoryMat = new THREE.MeshStandardMaterial({
    color: 0xFFFBEB,
    roughness: 0.25,
    metalness: 0.15,
  });

  // 1. Muscular main body
  const bodyGeo = new THREE.BoxGeometry(2.4 * scale, 2.6 * scale, 3.8 * scale);
  const body = new THREE.Mesh(bodyGeo, elephantMat);
  body.position.y = 2.8 * scale;
  body.castShadow = true;
  group.add(body);

  // 2. Sculpted head
  const headGeo = new THREE.BoxGeometry(1.8 * scale, 1.8 * scale, 1.8 * scale);
  const head = new THREE.Mesh(headGeo, elephantMat);
  head.position.set(0, 3.2 * scale, 2.4 * scale);
  head.castShadow = true;
  group.add(head);

  // 3. Characteristic large African ears (shaped broad fans)
  const earGeo = new THREE.BoxGeometry(0.12 * scale, 1.9 * scale, 1.6 * scale);
  const leftEar = new THREE.Mesh(earGeo, elephantMat);
  leftEar.position.set(-1.2 * scale, 3.3 * scale, 2.0 * scale);
  leftEar.rotation.y = -0.4;
  leftEar.rotation.z = -0.2;
  const rightEar = leftEar.clone();
  rightEar.position.x = 1.2 * scale;
  rightEar.rotation.y = 0.4;
  rightEar.rotation.z = 0.2;
  group.add(leftEar, rightEar);

  // 4. Trunk with downward curve
  const trunkBaseGeo = new THREE.CylinderGeometry(0.35 * scale, 0.45 * scale, 1.6 * scale, 8);
  const trunkBase = new THREE.Mesh(trunkBaseGeo, elephantMat);
  trunkBase.position.set(0, 2.2 * scale, 3.1 * scale);
  trunkBase.rotation.x = 0.35;
  group.add(trunkBase);

  const trunkTipGeo = new THREE.CylinderGeometry(0.22 * scale, 0.35 * scale, 1.4 * scale, 8);
  const trunkTip = new THREE.Mesh(trunkTipGeo, elephantMat);
  trunkTip.position.set(0, 1.1 * scale, 3.6 * scale);
  trunkTip.rotation.x = -0.3;
  group.add(trunkTip);

  // 5. Dual Ivory Tusks
  const tuskGeo = new THREE.ConeGeometry(0.12 * scale, 1.5 * scale, 8);
  const leftTusk = new THREE.Mesh(tuskGeo, ivoryMat);
  leftTusk.position.set(-0.55 * scale, 2.0 * scale, 3.2 * scale);
  leftTusk.rotation.x = -1.1;
  leftTusk.rotation.z = 0.2;
  const rightTusk = leftTusk.clone();
  rightTusk.position.x = 0.55 * scale;
  rightTusk.rotation.z = -0.2;
  group.add(leftTusk, rightTusk);

  // 6. Four Sturdy Pillar Legs
  const legGeo = new THREE.CylinderGeometry(0.42 * scale, 0.48 * scale, 2.0 * scale, 8);
  const legPositions = [
    [-0.85 * scale, 1.0 * scale, 1.2 * scale],
    [0.85 * scale, 1.0 * scale, 1.2 * scale],
    [-0.85 * scale, 1.0 * scale, -1.2 * scale],
    [0.85 * scale, 1.0 * scale, -1.2 * scale],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, elephantMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    group.add(leg);
  });

  // Soft Contact shadow
  const shadowGeo = new THREE.CircleGeometry(2.6 * scale, 16);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x18181B,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(shadow);

  return group;
}

export function createGiraffe(scale = 1): THREE.Group {
  const group = new THREE.Group();

  const giraffeMat = new THREE.MeshStandardMaterial({
    roughness: 0.7,
    metalness: 0.05,
    map: getGiraffePatternTexture(),
    flatShading: true,
  });

  // 1. Sloping body
  const bodyGeo = new THREE.BoxGeometry(1.2 * scale, 1.4 * scale, 2.2 * scale);
  const body = new THREE.Mesh(bodyGeo, giraffeMat);
  body.position.set(0, 3.4 * scale, 0);
  body.rotation.x = 0.15;
  body.castShadow = true;
  group.add(body);

  // 2. Long slender neck
  const neckGeo = new THREE.CylinderGeometry(0.24 * scale, 0.42 * scale, 3.6 * scale, 7);
  const neck = new THREE.Mesh(neckGeo, giraffeMat);
  neck.position.set(0, 5.4 * scale, 0.8 * scale);
  neck.rotation.x = 0.3;
  neck.castShadow = true;
  group.add(neck);

  // 3. Head & muzzle
  const headGeo = new THREE.BoxGeometry(0.55 * scale, 0.6 * scale, 0.9 * scale);
  const head = new THREE.Mesh(headGeo, giraffeMat);
  head.position.set(0, 7.2 * scale, 1.6 * scale);
  head.castShadow = true;
  group.add(head);

  // 4. Ossicones (horns)
  const hornGeo = new THREE.CylinderGeometry(0.04 * scale, 0.04 * scale, 0.35 * scale, 6);
  const leftHorn = new THREE.Mesh(hornGeo, new THREE.MeshStandardMaterial({ color: 0x3d2010 }));
  leftHorn.position.set(-0.16 * scale, 7.6 * scale, 1.5 * scale);
  const rightHorn = leftHorn.clone();
  rightHorn.position.x = 0.16 * scale;
  group.add(leftHorn, rightHorn);

  // 5. Four Long Legs
  const legGeo = new THREE.CylinderGeometry(0.14 * scale, 0.18 * scale, 2.8 * scale, 6);
  const legPositions = [
    [-0.45 * scale, 1.4 * scale, 0.8 * scale],
    [0.45 * scale, 1.4 * scale, 0.8 * scale],
    [-0.45 * scale, 1.4 * scale, -0.8 * scale],
    [0.45 * scale, 1.4 * scale, -0.8 * scale],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, giraffeMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    group.add(leg);
  });

  return group;
}

export function createFlamingo(scale = 1): THREE.Group {
  const group = new THREE.Group();

  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xF472B6, // Vibrant flamingo rose
    roughness: 0.6,
    metalness: 0.05,
    flatShading: true,
  });

  const beakMat = new THREE.MeshStandardMaterial({
    color: 0x18181B, // Black downward tip
    roughness: 0.4,
  });

  // Body
  const bodyGeo = new THREE.SphereGeometry(0.45 * scale, 8, 8);
  bodyGeo.scale(1, 0.8, 1.4);
  const body = new THREE.Mesh(bodyGeo, pinkMat);
  body.position.y = 1.3 * scale;
  group.add(body);

  // S-curve neck
  const neckGeo = new THREE.CylinderGeometry(0.06 * scale, 0.08 * scale, 1.0 * scale, 6);
  const neck = new THREE.Mesh(neckGeo, pinkMat);
  neck.position.set(0, 1.9 * scale, 0.35 * scale);
  neck.rotation.x = -0.3;
  group.add(neck);

  // Head and downward beak
  const headGeo = new THREE.SphereGeometry(0.14 * scale, 6, 6);
  const head = new THREE.Mesh(headGeo, pinkMat);
  head.position.set(0, 2.4 * scale, 0.2 * scale);
  group.add(head);

  const beakGeo = new THREE.ConeGeometry(0.06 * scale, 0.25 * scale, 5);
  const beak = new THREE.Mesh(beakGeo, beakMat);
  beak.position.set(0, 2.3 * scale, 0.38 * scale);
  beak.rotation.x = 1.8;
  group.add(beak);

  // Thin legs
  const legGeo = new THREE.CylinderGeometry(0.025 * scale, 0.025 * scale, 1.2 * scale, 4);
  const legL = new THREE.Mesh(legGeo, pinkMat);
  legL.position.set(-0.1 * scale, 0.6 * scale, 0);
  const legR = legL.clone();
  legR.position.x = 0.1 * scale;
  group.add(legL, legR);

  return group;
}

export function createSwahiliDhow(scale = 1): THREE.Group {
  const group = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x5C381E,
    roughness: 0.8,
    metalness: 0.1,
  });

  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xFDFBF7,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  // Carved wooden hull
  const hullGeo = new THREE.CylinderGeometry(0.8 * scale, 0.5 * scale, 5.0 * scale, 6);
  hullGeo.rotateZ(Math.PI / 2);
  hullGeo.scale(1.2, 0.8, 1);
  const hull = new THREE.Mesh(hullGeo, woodMat);
  hull.position.y = 0.4 * scale;
  hull.castShadow = true;
  group.add(hull);

  // Mast tilted forward
  const mastGeo = new THREE.CylinderGeometry(0.08 * scale, 0.1 * scale, 4.8 * scale, 6);
  const mast = new THREE.Mesh(mastGeo, woodMat);
  mast.position.set(0, 2.6 * scale, 0.4 * scale);
  mast.rotation.z = -0.15;
  mast.castShadow = true;
  group.add(mast);

  // Triangular Lateen Sail
  const sailShape = new THREE.Shape();
  sailShape.moveTo(0, 0);
  sailShape.lineTo(0, 4.2 * scale);
  sailShape.lineTo(3.2 * scale, 0.8 * scale);
  sailShape.closePath();

  const sailGeo = new THREE.ShapeGeometry(sailShape);
  const sail = new THREE.Mesh(sailGeo, sailMat);
  sail.position.set(0.1 * scale, 0.9 * scale, 0.4 * scale);
  sail.rotation.y = 0.2;
  sail.castShadow = true;
  group.add(sail);

  return group;
}

export function createLuxurySafariCamp(): THREE.Group {
  const group = new THREE.Group();

  const woodDeckMat = new THREE.MeshStandardMaterial({
    color: 0x5A3825,
    roughness: 0.8,
    metalness: 0.05,
  });

  const canvasMat = new THREE.MeshStandardMaterial({
    color: 0xE6D8C3, // Weatherproof safari cream canvas
    roughness: 0.75,
  });

  const poleMat = new THREE.MeshStandardMaterial({
    color: 0x331C0E,
    roughness: 0.9,
  });

  // 1. Raised timber viewing deck
  const deckGeo = new THREE.BoxGeometry(6.4, 0.3, 7.2);
  const deck = new THREE.Mesh(deckGeo, woodDeckMat);
  deck.position.y = 0.5;
  deck.castShadow = true;
  group.add(deck);

  // 2. Main tent structure
  const tentGeo = new THREE.BoxGeometry(4.8, 2.6, 5.0);
  const tent = new THREE.Mesh(tentGeo, canvasMat);
  tent.position.set(0, 1.95, -0.6);
  tent.castShadow = true;
  group.add(tent);

  // 3. Peaked Marquee Roof
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-2.6, 0);
  roofShape.lineTo(0, 1.5);
  roofShape.lineTo(2.6, 0);
  roofShape.closePath();

  const extrudeSettings = { depth: 5.4, bevelEnabled: false };
  const roofGeo = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
  const roof = new THREE.Mesh(roofGeo, canvasMat);
  roof.position.set(0, 3.25, -3.3);
  roof.castShadow = true;
  group.add(roof);

  // 4. Veranda Deck Firepit (Boma)
  const pitGeo = new THREE.CylinderGeometry(0.8, 0.9, 0.4, 12);
  const pitMat = new THREE.MeshStandardMaterial({ color: 0x2A272A, roughness: 0.95 });
  const firepit = new THREE.Mesh(pitGeo, pitMat);
  firepit.position.set(1.8, 0.85, 2.2);
  group.add(firepit);

  // Glowing coals
  const coalsGeo = new THREE.CircleGeometry(0.65, 12);
  const coalsMat = new THREE.MeshStandardMaterial({
    color: 0xFF5722,
    emissive: 0xEA580C,
    emissiveIntensity: 1.2,
    roughness: 0.3,
  });
  const coals = new THREE.Mesh(coalsGeo, coalsMat);
  coals.rotation.x = -Math.PI / 2;
  coals.position.set(1.8, 1.06, 2.2);
  group.add(coals);

  return group;
}
