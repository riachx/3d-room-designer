import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import {
    wallMaterial,
    floorMaterial,
    emissiveWindow,
    comforterTop,
    comforterBottom,
    pillowFront,
    pillowBack,
} from './materials.js';
import { BoxGeometry } from 'three';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();


const loader = new GLTFLoader();
let modelWall;
loader.load(
    './assets/wall.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                console.log(child.name);
                if(child.name == "roomWall"){
                    child.material = wallMaterial; // Apply the new material
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
                if(child.name == "window"){
                    child.material = floorMaterial; // Apply the new material
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
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

const loader_floor = new GLTFLoader();
let modelFloor;
loader_floor.load(
    './assets/floor.gltf',
    function (gltf1) {
        gltf1.scene.traverse(function (child) {
            if (child.isMesh) {
                if(child.name == "roomFloor"){
                    child.material = floorMaterial; // Apply the new material
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
                
                
            }
        });
        modelFloor = gltf1.scene;
        
        scene.add(modelFloor);
    },
    
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);



const loaderFrame = new GLTFLoader();
let modelFrame;
loaderFrame.load(
    './assets/frame.gltf',
    function (gltf2) {
        gltf2.scene.traverse(function (child) {
            if (child.isMesh) {
                if(child.name == "frame"){
                    child.material = floorMaterial; // Apply the new material
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            }
        });
        modelFrame = gltf2.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelFrame);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);


const loaderBed = new GLTFLoader();
let modelBed;
loaderBed.load(
    './assets/bed.gltf',
    function (gltf3) {
        gltf3.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                if(child.name == "headboard" || child.name == "frontboard" || child.name == "underboard"){
                    child.material = floorMaterial; // Apply the new material
                    
                }
                if(child.name == "topblanket"){
                    child.material = comforterTop; // Apply the new material
                    
                }
                if(child.name == "bottomblanket"){
                    child.material = comforterBottom; // Apply the new material
                    
                }
                if(child.name == "pillow1"){
                    child.material = pillowBack; // Apply the new material
                    
                }
                if(child.name == "pillow2"){
                    child.material = pillowFront; // Apply the new material
                    
                }
            }
        });
        modelBed = gltf3.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelBed);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);


/*const pointLight = new THREE.DirectionalLight( 0xff0000, 50, 5 );
pointLight.position.set( 0.4,0,-3 );
//pointLight.scale.set(0.5,0.5,0.5);
pointLight.castShadow= true;
scene.add( pointLight );

const sphereSize = 0.5;
const pointLightHelper = new THREE.DirectionalLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

var spotlight = new THREE.SpotLight(0xff0000,10);
spotlight.position.set(0.4, -0.7, -0.5);
spotlight.lookAt(1,0,1);
spotlight.castShadow = true;
scene.add(spotlight);

const lightD = new THREE.PointLight( 0xff0000, 10 );
lightD.position.set( 0.4, -0.3, -0.5 ); //default; light shining from top
//lightD.target.position.set(0.4,-0.6,-0.4);
lightD.castShadow = true; // default false
scene.add( lightD );

const sphereSize = 0.5;
const pointLightHelper = new THREE.PointLightHelper( lightD, sphereSize );
const spotLightHelper = new THREE.SpotLightHelper( spotlight, sphereSize );
scene.add( pointLightHelper,spotLightHelper );

//Set up shadow properties for the light
lightD.shadow.mapSize.width = 512; // default
lightD.shadow.mapSize.height = 512; // default
lightD.shadow.camera.near = 0.5; // default
lightD.shadow.camera.far = 500; // default*/
const hemilight = new THREE.HemisphereLight( 0xfff7e5, 0xFFA500, 0.3 );
scene.add( hemilight );


var spotlight = new THREE.SpotLight(0xFF4500,100);
spotlight.position.set(0, 0.7, -1.7);
spotlight.target.position.set(0,-5,0);
spotlight.penumbra = 0.5;
spotlight.castShadow = true;
scene.add(spotlight);

const sphereSize = 0.5;
const spotLightHelper = new THREE.SpotLightHelper( spotlight, sphereSize );
scene.add(spotLightHelper );

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const torusGeometry = new THREE.TorusKnotGeometry(0.5,0.2,100); // Sphere geometry for switching


const groundgeo = new THREE.BoxGeometry(10,0.05,10);
const ground = new THREE.Mesh(groundgeo, floorMaterial);
ground.receiveShadow = true; //default
ground.position.set(0,-1,0);
scene.add(ground);

const geometry1 = new THREE.BoxGeometry(1,1,0.5);
const cube = new THREE.Mesh(geometry1, emissiveWindow);
cube.castShadow = true; //default is false
cube.receiveShadow = false; //default
cube.position.set(0,0,-1.3);
//scene.add(cube);

const hemiMaterial = new THREE.MeshStandardMaterial({
    color: 0xB9794B,  // Red color
    metalness: 0.0,
    roughness: 0.9
  });





/*const geometry2 = new THREE.BoxGeometry(2,0.1,2);
const material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const floor = new THREE.Mesh(geometry2, material2);
floor.castShadow = false; //default is false
floor.receiveShadow = true; //default
floor.position.set(0,-0.6,0);

scene.add(floor);*/



// Add a light to the scene
const light = new THREE.PointLight(0xffffff, 10);
light.position.set(5, 5, 5);
scene.add(light);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
    metalness: 0,
    color:0x222fff,
        roughness: 0.5,
        envMapIntensity: 0.9,
        clearcoat: 1,
        thickness:15,
        transparent: true,
        transmission: .96,
        opacity: 1,
        ior:12,
        reflectivity: 0.35,
});

const planeTexture = new THREE.TextureLoader().load("./assets/background.png");
const plane_mat = new THREE.MeshBasicMaterial({ map: planeTexture });

const plane_geo = new THREE.BoxGeometry(2, 2, 0.1);
const plane = new THREE.Mesh(plane_geo,plane_mat);
//scene.add(plane);

const mesh = new THREE.Mesh(boxGeometry, material);
mesh.castShadow = true; // Enable the object to cast shadows
//scene.add(mesh);

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
    //scene.background = 0xB9794B;
    //scene.environment = texture;
  });


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(3, 2, 3);
scene.add(camera);




const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights=true;


// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 2, 2, 1 ); //default; light shining from top
directionalLight.castShadow = true; // default false
scene.add( directionalLight );

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    //modelFrame.rotation.y += 0.01%10;
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
        const colorPicked = this.value;

        if (wallMaterial) {
            wallMaterial.color.set(colorPicked);
            console.log(wallMaterial.color);
        }
    });
});

