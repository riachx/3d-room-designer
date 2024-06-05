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
    glass,
    bulb,
    duvet,
    glassReflect,
    mirror,
    greenGlass

} from './materials.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
let darkModeOn = false;
let modelFan;

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
    './assets/floor-wood.gltf',
    function (gltf1) {
        gltf1.scene.traverse(function (child) {
            if (child.isMesh) {
                if(child.name == "roomFloor"){
                    child.material = floorMaterial; // Apply the new material
                    child.receiveShadow = true;
                    child.castShadow = true;
                } else {
                    const bumpFloor = new THREE.TextureLoader().load('./assets/bump.jpeg')
                    
                    
                    child.material.bumpMap = bumpFloor;
                    child.material.bumpScale = 2;

                    child.receiveShadow = true;
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

const loaderDeskLamp = new GLTFLoader();
let modelDeskLamp;
loaderDeskLamp.load(
    './assets/lamp-desk.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                
            }
        });
        modelDeskLamp = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelDeskLamp);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);

const loaderShelf = new GLTFLoader();
let modelShelf;
loaderShelf.load(
    './assets/shelf.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                if(child.name.includes("BOTTLE")){
                    child.material = greenGlass;
                }
            }
        });
        modelShelf = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelShelf);
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

                
                if (child.name == "topblanket" || child.name == "bottomblanket"){
                    
                }
                
                if(child.name == "pillow1"){
                    child.material = pillowBack; // Apply the new material
                    
                }
                if(child.name == "pillow2"){
                    child.material = pillowFront; // Apply the new material
                    
                }
                if(child.name == "underblanket"){
                    child.material = duvet;
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

function modifyBedMaterial(textureName) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(`./assets/textures/${textureName}.png`, function (bedCovers) {
        bedCovers.colorSpace = THREE.SRGBColorSpace;

        if (modelBed) {
            modelBed.traverse(function (child) {
                if (child.isMesh) {
                    if (child.name == "bottomblanket" || child.name == "topblanket") {
                        child.material.map = bedCovers;
                        child.material.needsUpdate = true;
                    }

                    if (textureName == "bed-stripes") {
                        if (child.name == "pillow1") {
                            child.material.color.set(0x8A7D76);
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0x8B756A);
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xD8C1B5);
                        }
                    }

                    if (textureName == "bed-plaid") {
                        if (child.name == "pillow1" || child.name == "pillow2") {
                            child.material.color.set(0xd5622d);
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xed9936);
                        }
                    }

                    if (textureName == "bed-quilt") {
                        if (child.name == "pillow1") {
                            child.material.color.set(0xBC354B);
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0xFF495F);
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xed9936);
                        }
                    }

                    if (textureName == "bed-flowers") {
                        if (child.name == "pillow1") {
                            child.material.color.set(0xD6352F);
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0xEC5852);
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xF4A6A3);
                        }
                    }

                    if (textureName == "bed-stars") {
                        if (child.name == "pillow1") {
                            child.material.color.set(0xBC354B);
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0xFF495F);
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xF4A6A3);
                        }
                    }

                    if (textureName == "bed-fruit") {
                        if (child.name == "pillow1" || child.name == "pillow2") {
                            child.material.color.set(0xd5622d);
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xed9936);
                        }
                    }
                }
            });
        } else {
            console.log("modelBed is not loaded yet.");
        }
    }, undefined, function (err) {
        console.error('An error occurred loading the texture:', err);
    });
}


// ******** NEED 20 PRIMITIVES - PUT HERE ************/
/*const mirror_geo = new THREE.BoxGeometry(0.32,0.3,0.03);
const mirror_mat = mirror;
const mirrorMesh = new THREE.Mesh(mirror_geo, mirror_mat);

const mirrorFrame_geo = new THREE.BoxGeometry(0.4,0.4,0.04);
const mirrorFrameMesh = new THREE.Mesh(mirrorFrame_geo, floorMaterial);
scene.add(mirrorFrameMesh)

const torus_geo = new THREE.TorusKnotGeometry(0.03,0.02,100,100);
const torus_mesh = new THREE.Mesh(torus_geo,greenGlass);
torus_mesh.position.set(0.45,-0.35,-0.7)
scene.add(torus_mesh);


mirrorMesh.position.set(-0.5,0,-0.86);
mirrorFrameMesh.position.set(-0.5,0,-0.87);
scene.add(mirrorMesh);*/

const loaderDesk = new GLTFLoader();
let modelDesk;
loaderDesk.load(
    './assets/desk-chair.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                
            }
        });
        modelDesk = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
       
        
        scene.add(modelDesk);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);


const loaderStringLights = new GLTFLoader();
let modelStringLights;
loaderStringLights.load(
    './assets/string-lights.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                if(child.name.includes("glass-bulb")){
                    child.material = glass; // Apply the new material
                    
                }
                if(child.name.startsWith("bulb")){
                    child.material = bulb; // Apply the new material
                    
                }

                if(child.name.includes("string")){
                    child.material = floorMaterial; // Apply the new material
                    
                }
            }
        });
        modelStringLights = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelStringLights);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);



const loaderPictureFrames = new GLTFLoader();
let modelPictureFrames;
loaderPictureFrames.load(
    './assets/picture-frames.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                
            }
        });
        modelPictureFrames = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelPictureFrames);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);

const loaderLadder = new GLTFLoader();
let modelLadder;
loaderLadder.load(
    './assets/ladder.gltf',
    function (gltf5) {
        gltf5.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                
            }
        });
        modelLadder = gltf5.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelLadder);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);


const loaderHangingPlant = new GLTFLoader();
let modelHangingPlant;
loaderLadder.load(
    './assets/hanging-plant.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                
            }
        });
        modelHangingPlant = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelHangingPlant);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);


const loaderCeiling = new GLTFLoader();
let modelCeiling;
loaderCeiling.load(
    './assets/wood-ceiling.gltf',
    
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                
            }
        });
        modelCeiling = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelCeiling);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);



const loaderFan = new GLTFLoader();
loaderFan.load(
    './assets/fan.gltf',
    
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                
            }
        });
        modelFan = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        
        scene.add(modelFan);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);

const rug = new THREE.TextureLoader().load('./assets/rug-green.png')


const loaderRug = new GLTFLoader();
let modelRug;
loaderRug.load(
    './assets/rug.gltf',
    
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {

                child.receiveShadow = true;
                child.castShadow = true;
                //child.material.map = rug;
            }
        });
        modelRug = gltf.scene;
       // modelFrame.position.set(0,0,0);
        
        //modelRug.object.material.map = rug;
        scene.add(modelRug);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);

function modifyRugMaterial(textureName) {
    console.log(textureName);
    const rug = new THREE.TextureLoader().load(`./assets/textures/${textureName}.png`);
    rug.colorSpace = THREE.SRGBColorSpace

    if (modelRug) {
        modelRug.traverse(function (child) {
            if (child.isMesh) {

                child.material.map = rug;
            }
        });
    } else {
        console.log("modelRug is not loaded yet.");
    }
}

 

const hemilight = new THREE.HemisphereLight( 0xfff7e5, 0xFFA500, 0.7 );
scene.add( hemilight );

var spotlight = new THREE.SpotLight(0xFF4500,100);
spotlight.position.set(0, 0.7, -1.7);
spotlight.target.position.set(0,-5,0);
spotlight.penumbra = 0.5;
spotlight.castShadow = true;
spotlight.shadow.mapSize.set( 4096, 4096);
scene.add(spotlight);


var deskSpotLight = new THREE.SpotLight(0xFF4500,10);
deskSpotLight.position.set(-0.16, -0.16, -0.72);
deskSpotLight.target.position.set(0,-1,-0.75);
deskSpotLight.penumbra = 1;
deskSpotLight.castShadow = true;
//deskSpotLight.shadow.mapSize.set( 4096, 4096);
scene.add(deskSpotLight);

const sphereSize = 0.5;

const deskSpotLightHelper = new THREE.SpotLightHelper( deskSpotLight, sphereSize );
//scene.add(deskSpotLightHelper );


const spotLightHelper = new THREE.SpotLightHelper( spotlight, sphereSize );
//scene.add(spotLightHelper );

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

// ***** STRING LIGHTS ******** //


const bulb1 = new THREE.PointLight(0xFF8B3B, 0.12);
bulb1.position.set(-0.5,0.5,0);
bulb1.decay = 4;


const bulb2 = bulb1.clone();
bulb2.translateZ(0.3);

const bulb3 = bulb2.clone();
bulb3.translateZ(0.3);

const bulb4 = bulb1.clone();
bulb4.translateZ(-0.4);

const bulb5 = bulb1.clone();
bulb5.translateZ(-0.4);


scene.add(bulb1, bulb2, bulb3,bulb4,bulb5);

// Add a light to the scene
const light = new THREE.PointLight(0xE3823C, 10);
light.position.set(2,0,-1);
scene.add(light);

const pointlightleft = new THREE.PointLight(0xFFBA62, 1);
pointlightleft.position.set(-0.5,0.5,1.2);
scene.add(pointlightleft);




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
camera.position.set(3.8, 1.5, 2.5);

scene.add(camera);




const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0.8);
controls.update();

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.physicallyCorrectLights=true;
renderer.antialias =true;



// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 2, 2, 1 ); //default; light shining from top
directionalLight.castShadow = true; // default false


directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default

scene.add( directionalLight );

let time = 0;
let sinIntensity = 0;
let cosIntensity = 0;

function animate() {
    requestAnimationFrame(animate);
    
    if(modelFan) modelFan.rotation.y += 0.01;


    time+=0.1;

    sinIntensity = (Math.sin(time) + 2) / 2 * 0.5;
    cosIntensity = (Math.cos(time) + 1) / 5 * 0.5;

    //modelFrame.rotation.y += 0.01%10;
    renderer.render(scene, camera);

    if (darkModeOn) {
        bulb1.intensity = sinIntensity;
        bulb2.intensity = cosIntensity;
    } else {
    }

}

animate();
document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    const items = document.querySelectorAll(".item, .slider");
    const clickedItems = {};

    function filterItems(group) {
        items.forEach(item => {
            if (item.getAttribute("data-group") === group) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
        updateActiveTab(group);
    }

    function updateActiveTab(activeGroup) {
        tabs.forEach(tab => {
            if (tab.getAttribute("data-group") === activeGroup) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });
    }

    function handleItemClick(event) {
        const group = event.currentTarget.getAttribute("data-group");
        const name = event.currentTarget.getAttribute("data-name");
        
        // Remove 'clicked' class from previously clicked item in the same group
        if (clickedItems[group]) {
            clickedItems[group].classList.remove("active");
        }

        // Add 'clicked' class to the current item and update the clickedItems object
        event.currentTarget.classList.add("active");
        clickedItems[group] = event.currentTarget;

        //console.log(clickedItems[group]);

        //console.log(`Item clicked: ${name}`);
        
        if(name.includes("rug")){
            modifyRugMaterial(name);
        }

        if(name.includes("bed")){
            modifyBedMaterial(name);
            console.log(name);
        }

    }


    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const group = tab.getAttribute("data-group");
            filterItems(group);
        });
    });

    items.forEach(item => {
        item.addEventListener("click", handleItemClick);
    });

    // Display items for group 1 by default and set the corresponding tab as active
    filterItems("1");
});







/*const button = document.getElementById('toggleShape');
button.addEventListener('click', function() {
    if (mesh.geometry.type === 'BoxGeometry') {
        mesh.geometry = torusGeometry; // Switch to sphere
    } else {
        mesh.geometry = boxGeometry; // Switch back to cube
    }
});*/


/*const buttonWall = document.getElementById('toggleWall');
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
});*/

document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('colorPicker');
    const darkModeToggle = document.getElementById('darkModeToggle');
    let flickerInterval;
    // Event listener for color change
    colorPicker.addEventListener('input', function () {
        console.log("The selected color is:", this.value);
        const colorPicked = this.value;

        if (wallMaterial) {
            wallMaterial.color.set(colorPicked);
            console.log(wallMaterial.color);
        }
    });

   

    darkModeToggle.addEventListener('change', function() {
        
        darkModeOn = this.value;
        if (this.checked) {
            console.log("DARK!")
            darkModeOn = true;
            hemilight.intensity = 0;
            spotlight.intensity = 0;
            ambientLight.intensity = 0.1;
            directionalLight.intensity = 0;
            light.intensity = 0;
            pointlightleft.intensity = 0;
            deskSpotLight.intensity = 2;
            deskSpotLight.color = new THREE.Color(0xEAA349);
        } else {
            console.log("LIGHT!")
            darkModeOn = false;
            hemilight.intensity = 0.7;
            spotlight.intensity = 100;
            ambientLight.intensity = 0.1;
            directionalLight.intensity = 1;
            light.intensity = 10;
            pointlightleft.intensity = 1;
            deskSpotLight.intensity = 10;
            deskSpotLight.color = new THREE.Color(0xFF4500);
            
        }
    });
});             

