import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
    scene,
    canvas,
    boxGeometry,
    torusGeometry,
    modelWall,
    mesh
} from './geometry.js';


const rgbeLoader = new RGBELoader();
  rgbeLoader.load('./assets/belfast.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    renderer.toneMapping = THREE.CineonToneMapping;
    renderer.toneMappingExposure = 1;
    
    // Set the scene background or environment
    //scene.background = texture;
    const loader = new THREE.TextureLoader();
    loader.load('./assets/background.png', function (texture) {
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
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
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

const button = document.getElementById('toggleShape');
button.addEventListener('click', function() {
    if (mesh.geometry.type === 'BoxGeometry') {
        mesh.geometry = torusGeometry; // Switch to sphere
    } else {
        mesh.geometry = boxGeometry; // Switch back to cube
    }
});


const buttonWall = document.getElementById('toggleWall');
buttonWall.addEventListener('click', function () {
  
    if (modelWall) {
        modelWall.traverse(function (child) {
            if (child.isMesh) {
              
              console.log(child.material.color);
              if (child.material.color != 0x00ffff) {
                child.material.color.set(0x00ffff); // Change the color to green
                
              } else {
                child.material.color.set(0xffff00);
                console.log("clicked but green already");
              }
          }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('colorPicker');

    // Event listener for color change
    colorPicker.addEventListener('input', function () {
        console.log("The selected color is:", this.value);
        // You can use this.value to set styles or do other actions
        //document.body.style.backgroundColor = this.value;
        const colorPicked = this.value

        if (modelWall) {
          modelWall.traverse(function (child) {
              if (child.isMesh) {
                
                console.log(child.material.color);
                child.material.color.set( colorPicked.replace("@", "*")); // Change the color to green
                  
              }
          });
      }
    });
});
