import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize scene
const scene = new THREE.Scene();

// initialize camera
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

camera.position.x = 5;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);
scene.add(camera);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// console.log(scene);
// init renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// init controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//init clock
const clock = new THREE.Clock();
let previousTime = 0;
console.log(clock);

const renderloop = () => {
  controls.update();

  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;

  previousTime = currentTime;

  cubeMesh.rotation.x += THREE.MathUtils.degToRad(1) * delta * 10;
  cubeMesh.scale.x = Math.sin(currentTime);

  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
