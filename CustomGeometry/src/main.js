import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize scene
const scene = new THREE.Scene();

// initialize camera
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0,
  0,
  0, // v0
  0,
  20,
  0, // v1
  20,
  0,
  0, // v2
]);

geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

camera.position.z = 100;

scene.add(cubeMesh);
scene.add(camera);

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// tourusknot gemoetry
const tourusknotgeometry = new THREE.TorusKnotGeometry(15, 3, 100, 10);
const tourusknotmaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const torusKnot = new THREE.Mesh(tourusknotgeometry, tourusknotmaterial);
torusKnot.position.z = -1;
scene.add(torusKnot);

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

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
