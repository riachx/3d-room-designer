import * as THREE from 'three';

const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xF5E8AB,  // Red color
    metalness: 0.0,
    roughness: 0.9
  });
  
  const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xB9794B,  // Red color
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
        color:0xF07F21
        
      });
      const pillowBack = new THREE.MeshStandardMaterial({
        color:0xFD7F20
        
      });

      
    
 export {
        wallMaterial,
        floorMaterial,
        emissiveWindow,
        comforterTop,
        comforterBottom,
        pillowFront,
        pillowBack,
};
    