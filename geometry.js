import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
    metalness: 0,
    color: 0x222fff,
    roughness: 0.5,
    envMapIntensity: 0.9,
    clearcoat: 1,
    thickness: 15,
    transparent: true,
    transmission: .96,
    opacity: 1,
    ior: 12,
    reflectivity: 0.35,
});

// Geometries
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const torusGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100); // Sphere geometry for switching


const planeTexture = new THREE.TextureLoader().load("./assets/background.png");
const plane_mat = new THREE.MeshBasicMaterial({ map: planeTexture });

const plane_geo = new THREE.BoxGeometry(2, 2, 0.1);
const plane = new THREE.Mesh(plane_geo,plane_mat);
scene.add(plane);




const mesh = new THREE.Mesh(boxGeometry, material);
mesh.castShadow = true; // Enable the object to cast shadows
scene.add(mesh);

// Materials
const newMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,  // Red color
    metalness: 0.0,
    roughness: 0.8
});

// Loaders
const loader = new GLTFLoader();
let modelWall;
loader.load(
    './assets/wall.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.material = newMaterial; // Apply the new material
            }
        });
        modelWall = gltf.scene;
        scene.add(modelWall);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);


// Exporting necessary variables and functions
export {
    scene,
    canvas,
    boxGeometry,
    modelWall,
    torusGeometry,
    mesh
};
