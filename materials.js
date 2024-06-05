import * as THREE from 'three';

const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xF5E8AB,  // Red color
    metalness: 0.0,
    roughness: 0.9
  });
  
  const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x935b32,  // Red color
      metalness: 0.0,
      roughness: 0.9
    });


  

  
  const emissiveWindow = new THREE.MeshStandardMaterial({
      emissive:0xfffff,
      emissiveIntensity:1000
      
    });

    const comforterTop = new THREE.MeshStandardMaterial({
        color:0xffffff
        
      });
      const comforterBottom = new THREE.MeshStandardMaterial({
        color:0xFD7F20
        
      });
      const pillowFront = new THREE.MeshStandardMaterial({
        color:0xeb733c
        
      });
      const pillowBack = new THREE.MeshStandardMaterial({
        color:0xd5622d
        
      });
      const duvet = new THREE.MeshStandardMaterial({
        color:0xed9936
      })
      
  const glass = new THREE.MeshPhysicalMaterial({
    metalness: .9,
    roughness: .5,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    // transmission: .95,
    opacity: 0.4,
    reflectivity: 0.2,
    refractionRatio: 0.985,
    ior: 1.1,
    side: THREE.BackSide,
    })

    const mirror = new THREE.MeshPhysicalMaterial({
      metalness: 0,
    roughness: 0.1,
    envMapIntensity: 0.9,
    clearcoat: 1,
    thickness: 15,
    transparent: true,
    transmission: .96,
    opacity: 1,
    ior: 1.2,
    reflectivity: 0.35,
      })

      const greenGlass = new THREE.MeshPhysicalMaterial({
        metalness: 0,
      roughness: 0.1,
      color:0xC46A6A  ,
      envMapIntensity: 0.9,
      clearcoat: 1,
      thickness: 15,
      transparent: true,
      transmission: .96,
      opacity: 1,
      ior: 1.2,
      reflectivity: 0.35,
        })

      
  

  const glassReflect = new THREE.MeshPhysicalMaterial({
    metalness: 0.9,
    roughness: 0,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    // transmission: .95,
    opacity: 0.0,
    reflectivity: 20,
    //refractionRatio: 0.985,
    //ior: 1.1,
    //side: THREE.BackSide,
    })
    //const bumpTexture = new THREE.TextureLoader().load('./assets/bump.jpeg')
    //glassReflect.bumpMap = bumpTexture


 const bulb = new THREE.MeshStandardMaterial({
      emissive:0xFFBA62,
      emissiveIntensity:10
      
    });

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x804A22,  // Red color
      metalness: 0.0,
      roughness: 0.9
    });

    const backgroundMaterial = new THREE.MeshStandardMaterial({
      color: 0x804A22,  // Red color
      metalness: 0.0,
      roughness: 0.9
    });

    
 export {
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
        greenGlass,
        groundMaterial,
        backgroundMaterial
};
    