console.log('Welcome to basic Threejs demo');

import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// Threejs animations require a renderer, camera and scene object

// RENDERER

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

// CAMERA

const fov = 90; // angle 0-90 degrees
const aspect = w / h; // set aspect ratio width divided by height
const near = 0.1; // anything < 0.1 will be invisible
const far = 20; // 20 seems to work for this demo here

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

// SCENE

const scene = new THREE.Scene();

// Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// Basic Threejs Primitive

const myShape = new THREE.TorusKnotGeometry(2, 0.5, 128, 16, 1); // hover func name for args
const myMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true
});
const myMesh = new THREE.Mesh(myShape, myMaterial);
scene.add(myMesh);

// Wireframe for myShape

const myWireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0xaabbcc,
  wireframe: true
});

const myWireMesh = new THREE.Mesh(myShape, myWireframeMaterial);
myWireMesh.scale.setScalar(1);
myMesh.add(myWireMesh);

// Lighting

const hemisphereLighting = new THREE.HemisphereLight(0x348eed, 0x6e519e);
scene.add(hemisphereLighting);

// Produce our Threejs animation

function animateGeometry(t = 0) {
  requestAnimationFrame(animateGeometry);
  myMesh.rotation.y = t * 0.00005;
  myMesh.rotation.x = t * 0.00005;
  renderer.render(scene, camera);
  controls.update();
}

animateGeometry();
