import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
    metalness: 0,
        roughness: 1,
        envMapIntensity: 0.9,
        clearcoat: 1,
        thickness:1.5,
        transparent: true,
        transmission: .95,
        opacity: 1,
        ior:1.2,
        reflectivity: 0.2,
});

const planeTexture = new THREE.TextureLoader().load("../assets/background.png");
const plane_mat = new THREE.MeshBasicMaterial({ map: planeTexture });

const plane_geo = new THREE.BoxGeometry(2, 2, 0.1);
const plane = new THREE.Mesh(plane_geo,plane_mat);
scene.add(plane);

const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true; // Enable the object to cast shadows
scene.add(mesh);

const rgbeLoader = new RGBELoader();
  rgbeLoader.load('./assets/belfast.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    renderer.toneMapping = THREE.CineonToneMapping;
    renderer.toneMappingExposure = 1;
    
    // Set the scene background or environment
    //scene.background = texture;
    const loader = new THREE.TextureLoader();
    loader.load('./background.png', function (texture) {
      //scene.background = texture;
    });
    scene.background = texture;  // Optional: use the same texture as environment
    scene.environment = texture;
  });


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 2);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(3, 5, 2); // Adjust to get the best look
directionalLight.castShadow = true; // Enable shadows for the light
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
