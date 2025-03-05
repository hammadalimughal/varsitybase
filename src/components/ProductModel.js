import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, useGLTF, Text, useProgress } from '@react-three/drei';
import loadingGif from '../assets/images/loading.gif'
import * as THREE from 'three'
import leatherTexture from '../assets/material-texture/leather.jpg'
import flagImage from '../assets/images/patches/us-flag.png'

const Loader = () => {
    const { progress } = useProgress(); // Get loading progress
    return (
        <div className='model-loading'>
            <img src={loadingGif} alt="Loading" />
            <h6>Loading {progress.toFixed(0)}%</h6>
        </div>
    )
}

const ModelPatch = ({ patch }) => {
    console.log('patch', patch)
    const patchTexture = useTexture(patch?.texture);
    // const { position, rotation, scale } = patch?.adjustment
    const position = [-4, 6, 1], rotation = [0, -0.5, 0], scale = [1, 1, 1];
    return (
        <mesh
            position={position}
            // position={[-1.55, 0.5, -0.2]}
            rotation={rotation}
            // rotation={[0.4, 4.5, 0]}
            // scale={[1.7, 1.7, 1.7]}
            scale={scale}
        >
            <planeGeometry args={[0.8, 0.8]} />
            <meshStandardMaterial map={patchTexture} transparent />
        </mesh>
    );
};

const ProductModel = ({ modelPath, patchs, formData }) => {
    console.log('patch', patchs);
    console.log('formData', formData);
    const { scene } = useGLTF(modelPath);
    const textures = useTexture(patchs.map(patch => patch.texture));
    const leather = useTexture(leatherTexture)
    const patchTexture = useTexture(flagImage)
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                console.log("Mesh Name: ", child.name);
                if (child.name == 'model001') {
                    console.log("Left Pocket: ", child.name);
                    const material = new THREE.MeshStandardMaterial({
                        map: leather, // Assuming the texture for left-sleeves is at index 0
                        // transparent: true,
                    });
                    // child.material.map = textures[1]
                    child.material = material;
                    child.material.needsUpdate = true;
                }
                if (child.name == 'patch') {
                    console.log("Left Pocket: ", child.name);
                    const material = new THREE.MeshStandardMaterial({
                        map: patchTexture, // Assuming the texture for left-sleeves is at index 0
                        // transparent: true,
                    });
                    // material.map.wrapS = THREE.RepeatWrapping;
                    // material.map.wrapT = THREE.RepeatWrapping;
                    // Adjust texture repeat to fit the entire texture on the object
                    // material.map.repeat.set(1, 1); // Adjust values based on your model

                    // Adjust offset to center the texture
                    // material.map.offset.set(0, 0); // Adjust values to center the texture
                    const scale = new THREE.Vector3().setFromMatrixScale(child.matrixWorld);
                    const maxScale = Math.max(scale.x, scale.y, scale.z);
                    // material.map.repeat.set(maxScale, maxScale);

                    // child.material.map = textures[1]
                    child.material = material;
                    child.material.needsUpdate = true;
                }
                // if (!child.material.map) {
                //     child.material.map = new THREE.TextureLoader().load(patchs[1].texture);
                // } else {
                //     child.material.map = textures[1];
                // }
                if (child.name == 'model001') {
                    console.log("Sleeves:", child.name);
                    child.material.color.set(formData?.sleeves?.hex);
                    // child.material.color.set('blue');
                }
                // if(child.name == 'model003'){
                //     console.log("Sleeves:", child.name);
                //     child.material.color.set("blue");
                // }
                if (child.name == 'left-pocket') {
                    // console.log("Sleeves:", child.name);
                    // child.material.color.set("red");
                }
            }
        });
    }, [scene, formData]);
    // useEffect(() => {
    //     patchs.forEach((patch, index) => {
    //         if (index) {
    //             scene.traverse((child) => {
    //                 console.log("Mesh Name: ", child.name);
    //                 // if (child.isMesh && child.name === patch.objectName) {
    //                 // if (child.isMesh && child.name === 'model001') {
    //                     if (child.isMesh && child.name === 'left-pocket') {
    //                     console.log("Applying texture to:", child.name);
    //                     if (!child.material.map) {
    //                         child.material.map = new THREE.TextureLoader().load(patch.texture);
    //                     } else {
    //                         child.material.map = textures[index];
    //                     }
    //                     // Set texture wrapping to repeat
    //                     child.material.map.wrapS = THREE.RepeatWrapping;
    //                     child.material.map.wrapT = THREE.RepeatWrapping;

    //                     // Extract scale from the object's matrix
    //                     const scale = new THREE.Vector3().setFromMatrixScale(child.matrixWorld);

    //                     // Calculate the maximum scale value
    //                     const maxScale = Math.max(scale.x, scale.y, scale.z);

    //                     // Adjust texture repeat to scale the texture
    //                     child.material.map.repeat.set(maxScale, maxScale);

    //                     child.material.needsUpdate = true; // Ensure the material updates
    //                 }
    //             });
    //         }
    //     });
    // }, [scene, textures, patchs]);

    scene.position.set(0, -0, 0);

    return (
        <>
            {/* {patchs.length > 0 && patchs.map((item, index) => (
                (item.type === 'image' || item.type === 'upload') ? (
                    item.texture && <ModelPatch key={index} patch={item} />
                ) : (
                    <Text
                        key={index}
                        position={item?.adjustment?.position}
                        rotation={item?.adjustment?.rotation}
                        fontSize={0.3}
                        color="#fff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {item?.text}
                    </Text>
                )
            ))} */}
            {/* <primitive object={scene} scale={3} />; */}
            <primitive object={scene} scale={10} />;
        </>
    );
};

const ProductViewer = ({ modelPath, patchs, formData }) => {
    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <Suspense fallback={<Loader />}>
                <Canvas style={{ width: '100%', height: '100%', display: 'block' }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 5]} />
                    <ProductModel modelPath={modelPath} patchs={patchs} formData={formData} />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </Suspense>
            {/* <Loader /> */}
        </div>
    );
};

export default ProductViewer;
