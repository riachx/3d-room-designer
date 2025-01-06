import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
    wallMaterial,
    floorMaterial,
    emissiveWindow,
    pillowFront,
    pillowBack,
    glass,
    bulb,
    duvet,
    greenGlass,
    groundMaterial,
    backgroundMaterial

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
        modelFloor.name = 'model_floor';
        
        scene.add(modelFloor);
    },
    
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);

const loader_floor_checkered = new GLTFLoader();
let modelFloorCheckered;
loader_floor_checkered.load(
    './assets/floor-checkered.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                
                
            }
        });
        modelFloorCheckered = gltf.scene;
        modelFloorCheckered.name = 'model_floor_checkered';
        //scene.add(modelFloorCheckered);
    },
    
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log("An error happened");
    }
);




// TWO PRIMITIVES
const disco_rod_geo = new THREE.CylinderGeometry(0.01,0.01,0.4);
const disco_rod = new THREE.Mesh(disco_rod_geo, floorMaterial);
disco_rod.position.set(0,0.8,0);

const disco_geo = new THREE.SphereGeometry( 0.2, 22, 16 ); 
const disco_mat = new THREE.MeshPhysicalMaterial( { 
    roughness:0.4, 
    metalness:0.6, 
    flatShading:true,
    reflectivity: 0.35,
    thickness: 15,
    transmission: .96,
} ); 
const disco = new THREE.Mesh( disco_geo, disco_mat ); 
disco.position.set(0,0.5,0);



var topLight = new THREE.SpotLight(0xfff000,5);
topLight.position.set(0,0.5, 0);
topLight.target.position.set(0,0,0);
topLight.penumbra = 1;
topLight.angle = 1;
topLight.castShadow = true;
scene.add(topLight);

//DISCO LIGHTS

var discoLight1 = new THREE.SpotLight(0xfff000,100);
discoLight1.position.set(0,0.5, 0);
discoLight1.target.position.set(0,0,0);
discoLight1.penumbra = 1;
discoLight1.angle = 0.3;
discoLight1.castShadow = true;

var discoLight2 = new THREE.SpotLight(0x1417DA,300);
discoLight2.position.set(0,0.5, 0);
discoLight2.target.position.set(0,0,0);
discoLight2.penumbra = 1;
discoLight2.angle = 0.2;
discoLight2.castShadow = true;

var discoLight3 = new THREE.SpotLight(0x00FFBD,50);
discoLight3.position.set(0,0.5, 0);
discoLight3.target.position.set(0,0,0);
discoLight3.penumbra = 1;
discoLight3.angle = 0.2;

var discoLight4 = new THREE.SpotLight(0x0013FF,200);
discoLight4.position.set(1,0.5, 0);
discoLight4.target.position.set(-1,0,1);
discoLight4.penumbra = 1;
discoLight4.angle = 0.2;

//deskSpotLight.shadow.mapSize.set( 4096, 4096);
//scene.add(discoLight1,discoLight2,discoLight3,discoLight4);



const sphereSize1 = 0.5;
//const discoLightHelper = new THREE.SpotLightHelper( discoLight1, sphereSize1 );
////scene.add(discoLightHelper);


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
                            child.material.map = null;
                            
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0x8B756A);
                            child.material.map = null;
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xD8C1B5);
                        }
                    }

                    if (textureName == "bed-plaid") {
                        if (child.name == "pillow1" || child.name == "pillow2") {
                            child.material.color.set(0xd5622d);
                            child.material.map = null;
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xed9936);
                        }
                    }

                    if (textureName == "bed-quilt") {
                        if (child.name == "pillow1") {
                            child.material.color.set(0xBC354B);
                            child.material.map = null;
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0xFF495F);
                            child.material.map = null;
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xed9936);
                        }
                    }

                    if (textureName == "bed-flowers") {
                        if (child.name == "pillow1") {
                            child.material.color.set(0xD6352F);
                            child.material.map = null;
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0xEC5852);
                            child.material.map = null;
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xF4A6A3);
                        }
                    }

                    if (textureName == "bed-stars") {
                        if (child.name == "pillow1") {
                            child.material.color.set(0xBC354B);
                            child.material.map = null;
                        }
                        if (child.name == "pillow2") {
                            child.material.color.set(0xFF495F);
                            child.material.map = null;
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xF4A6A3);
                        }
                    }

                    if (textureName == "bed-fruit") {
                        if (child.name == "pillow1" || child.name == "pillow2") {
                            child.material.color.set(0xd5622d);
                            child.material.map = null;
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xed9936);
                        }
                    }

                    if (textureName == "bed-prof") {
                        if (child.name == "pillow1" || child.name == "pillow2") {
                            child.material.map = bedCovers;
                            child.material.color.set(0x8A7D76);
                            child.material.needsUpdate = true;
                        }
                        if (child.name == "underblanket") {
                            child.material.color.set(0xffffff);
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

let clickCount = 0;
function switchFloors(textureName){
    
    clickCount+=1;

    // if the orange is clicked when wood is there
    if(textureName == "floor-checkered" && scene.getObjectByName('model_floor') !== undefined){

        console.log("hey stop reading my console logs!");
        scene.remove(modelFloor);
        scene.add(modelFloorCheckered);
    } 
    // if anything else is clicked
    else if (textureName.includes("floor-checkered") && clickCount%2 != 0){
        
        console.log("clicking hereeee");

        if(scene.getObjectByName('model_floor') !== undefined){
            scene.remove(modelFloor);
            scene.add(modelFloorCheckered);
            console.log("hit dat if statement");
        }

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(`./assets/textures/${textureName}.png`, function (floorTex) {
        floorTex.colorSpace = THREE.SRGBColorSpace

        if (modelFloorCheckered) {
            modelFloorCheckered.traverse(function (child) {
                if (child.isMesh) {

                    if(child.name != "roomFloor003"){
                        child.material.map = floorTex;
                    }
                }
            });
        } else {
            console.log("modelFloorCheckered is not loaded yet.");
        }
    }, undefined, function (err) {
        console.error('An error occurred loading the texture:', err);
    });

    
    } else if (textureName.includes("floor-wood") && clickCount%2 != 0){
        scene.remove(modelFloorCheckered);
        scene.add(modelFloor);
    }

}


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
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(`./assets/textures/${textureName}.png`, function (rug) {
    rug.colorSpace = THREE.SRGBColorSpace

    if (modelRug) {
        modelRug.traverse(function (child) {
            if (child.isMesh) {

                child.material.map = rug;
            }
        });
    } else {
        console.log("modelBed is not loaded yet.");
    }
}, undefined, function (err) {
    console.error('An error occurred loading the texture:', err);
});
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
const ground = new THREE.Mesh(groundgeo, groundMaterial);
ground.receiveShadow = true; //default
ground.position.set(0,-1,0);

const groundgeo2 = new THREE.BoxGeometry(10,0.05,10);
const ground2 = new THREE.Mesh(groundgeo2, groundMaterial);
ground2.receiveShadow = true; //default
ground2.position.set(0,4,0);

const wall_geo = new THREE.BoxGeometry(0.1,10,10);
const wall_mesh = new THREE.Mesh(wall_geo, backgroundMaterial);
wall_mesh.receiveShadow = true; //default
wall_mesh.position.set(-5,-1,0);

const wall_geo2 = new THREE.BoxGeometry(10,10,0.1);
const wall_mesh2 = new THREE.Mesh(wall_geo2, backgroundMaterial);
wall_mesh2.receiveShadow = true; //default
wall_mesh2.position.set(0,-1,-5);

const wall_geo3 = new THREE.BoxGeometry(0.1,10,10);
const wall_mesh3 = new THREE.Mesh(wall_geo3, backgroundMaterial);
wall_mesh3.receiveShadow = true; //default
wall_mesh3.position.set(5,-1,0);

const wall_geo4 = new THREE.BoxGeometry(10,10,0.1);
const wall_mesh4 = new THREE.Mesh(wall_geo4, backgroundMaterial);
wall_mesh4.receiveShadow = true; //default
wall_mesh4.position.set(0,-1,5);

scene.add(wall_mesh, ground, ground2, wall_mesh2, wall_mesh3, wall_mesh4);


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
let sinIntensity2 = 0;
let cosIntensity2 = 0;

function animate() {
    requestAnimationFrame(animate);
    
    if(modelFan) modelFan.rotation.y += 0.03;
    if(disco) disco.rotation.y += 0.03;
    if(discoLight1) discoLight1.position.set(0,0.4,sinIntensity2);
    if(discoLight2) discoLight2.position.set(cosIntensity2,0,sinIntensity2);
    if(discoLight3) discoLight3.position.set(sinIntensity2,0,cosIntensity);
    if(discoLight4) discoLight4.position.set(0,2,-3*sinIntensity+1);


    time+=0.1;

    sinIntensity = (Math.sin(1.5 * time) + 1) * 0.5; 
    cosIntensity = (Math.cos(1.5 * time) + 1) * 0.5;

    sinIntensity2 = (Math.sin(time) + 3) / 5;
    cosIntensity2 = (Math.cos(time) + 10) / 5 * 0.5;

    //modelFrame.rotation.y += 0.01%10;
    renderer.render(scene, camera);

    if (darkModeOn) {
        bulb1.intensity = sinIntensity/3;
        bulb2.intensity = cosIntensity;
    } else {
    }

}

animate();
let deskLightOn = true;
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
        
        if (clickedItems[group]) {
            clickedItems[group].classList.remove("active");
        }

         event.currentTarget.classList.add("active");
        clickedItems[group] = event.currentTarget;

        console.log(`Item clicked: ${name}`);
        
        if(name){
        if(name.includes("rug")){
            modifyRugMaterial(name);
        }

        if(name.includes("bed")){
            modifyBedMaterial(name);
        }

        if(name.includes("floor")){
            switchFloors(name);
        }

        if(name.includes("disco")){
            scene.remove(modelFan);
            scene.add(disco);
            scene.add(disco_rod);

        }
        if(name.includes("fan")){
            scene.remove(discoLight1,discoLight2,discoLight3,discoLight4);
            scene.remove(disco);
            scene.remove(disco_rod);
            scene.add(modelFan);

        }
        if(name.includes("lights")){
            scene.add(discoLight1,discoLight2,discoLight3,discoLight4);
            
            scene.remove(modelFan);
        }
        if(name == "nothing"){
            scene.remove(modelFan);
            scene.remove(discoLight1,discoLight2,discoLight3,discoLight4);
            scene.remove(disco);
            scene.remove(disco_rod);
           
        }
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

    const colorPicker = document.getElementById('colorPicker');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    const deskLightToggle = document.getElementById('deskLightToggle');
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

    deskLightToggle.addEventListener('change', function () {
        
        deskLightOn = this.checked;
        if (this.checked) {
           deskSpotLight.intensity = 0;
        } else{
            deskSpotLight.intensity = 10;
        }
    });

   

    darkModeToggle.addEventListener('change', function() {
        
        darkModeOn = this.value;
        if (this.checked) {
            console.log("DARK!")
            darkModeOn = true;
            hemilight.intensity = 0.1;
            spotlight.intensity = 0;
            ambientLight.intensity = 0.1;
            directionalLight.intensity = 0.1;
            light.intensity = 0;
            topLight.intensity =0.3;
            pointlightleft.intensity = 0;
            if(deskLightOn){
                deskSpotLight.intensity = 2;
            }
            
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
            if(deskLightOn){
                deskSpotLight.intensity = 10;
            }
            
            deskSpotLight.color = new THREE.Color(0xFF4500);
            
        }
    });
});             

