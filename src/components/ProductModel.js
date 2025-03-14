import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, useGLTF, Text, useProgress } from '@react-three/drei';
import loadingGif from '../assets/images/loading.gif'
import * as THREE from 'three'
import leatherTexture from '../assets/material-texture/leather.jpg'
import flagImage from '../assets/images/patches/us-flag.png'
import transparentImage from '../assets/images/patches/transparent.png'

const Loader = () => {
    const { progress } = useProgress(); // Get loading progress
    return (
        <div className='model-loading'>
            <img src={loadingGif} alt="Loading" />
            <h6>Loading {progress.toFixed(0)}%</h6>
        </div>
    )
}

// [
//     "Mesh037",
//     "Mesh037_1",
//     "collar_byron",
//     "collar_hoodie",
//     "Collar_Regular001",
//     "collar_trim_1line",
//     "collar_trim_2lines",
//     "collar_trim_4lines",
//     "Patch_Collar_Back",
//     "Collar_RetroSailor001",
//     "Patch_Collar_RetroSailor",
//     "collar_sailorwithzipper001",
//     "patch_collar_sailorwithzipper",
//     "inside_body_zipper",
//     "inside_Jacket_Snaps",
//     "patch_Backjacket",
//     "Patch_chest_L",
//     "Patch_chest_R",
//     "patch_LeftPocket_down",
//     "patch_LeftPocket_down_tilted",
//     "patch_LeftPocket_up",
//     "patch_LeftPocket_up_tilted",
//     "patch_RightPocket_down",
//     "patch_RightPocket_down_tilted",
//     "patch_RightPocket_up",
//     "patch_RightPocket_up_tilted",
//     "Jacket_snaps",
//     "Mesh006",
//     "Mesh006_1",
//     "Knit_Trim",
//     "Knit_Trim_1line",
//     "Knit_Trim_2lines",
//     "Knit_Trim_4lines",
//     "Logo",
//     "Pockets",
//     "shadow",
//     "Mesh039",
//     "Mesh039_1",
//     "sleeves_L",
//     "patch_L_sleeve1",
//     "patch_L_sleeve2",
//     "patch_L_sleeve3",
//     "patch_L_sleeve4",
//     "patch_R_sleeve1",
//     "patch_R_sleeve2",
//     "patch_R_sleeve3",
//     "patch_R_sleeve4",
//     "sleeves_R"
// ]

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
    // console.log('patch', JSON.stringify(patchs));
    // console.log('formData', formData);
    const { scene } = useGLTF(modelPath);
    const textures = useTexture(patchs.map(patch => patch.texture));
    const transparentPatch = useTexture(transparentImage);
    useEffect(() => {
        console.log('textures', textures)
        scene.traverse((child) => {
            if (child.isMesh) {
                // console.log("Mesh Name: ", child.name);
                if (child.name.toLowerCase().includes('patch')) {
                    // console.log("patch: ", child.name);
                    const patch = patchs.find(p => p.position === child.name);
                    console.log(child.name, patch)
                    // debugger
                    if (patch) {
                        const index = patchs.indexOf(patch)
                        // debugger
                        const texture = textures[index];
                        texture.flipY = false;  // Disable automatic flipping
                        texture.needsUpdate = true; // Ensure the update is applied
                        console.log(child.name, textures[index])
                        const material = new THREE.MeshStandardMaterial({
                            map: texture,
                            transparent: true,
                        });
                        child.material = material;
                        child.material.needsUpdate = true;
                    } else {
                        const material = new THREE.MeshStandardMaterial({
                            map: transparentPatch,
                            transparent: true,
                        });
                        child.material = material;
                        child.material.needsUpdate = true;
                    }
                }
                if (child.name == 'Jacket_snaps' || child.name == 'Mesh006') {
                    // console.log("Body:", child.name);
                    child.material.color.set(formData?.body?.hex);
                }
                if (child.name == 'sleeves_R' || child.name == 'sleeves_L') {
                    // console.log("Sleeves:", child.name);
                    child.material.color.set(formData?.sleeves?.hex);
                }
                if (child.name == 'Pockets') {
                    // console.log("Pockets:", child.name);
                    child.material.color.set(formData?.pocket?.hex);
                }
                if (child.name == 'inside_body_zipper' || child.name == 'inside_Jacket_Snaps') {
                    // console.log("Inside Lining:", child.name);
                    child.material.color.set(formData?.insideLining?.hex);
                }
                if (child.name == 'Mesh037') {
                    // console.log("Snaps:", child.name);
                    child.material.color.set(formData?.snaps?.hex);
                }
                if (child.name == 'Mesh006_1') {
                    // console.log("Zipper:", child.name);
                    const material = new THREE.MeshStandardMaterial({
                        map: transparentPatch,
                        transparent: true,
                    });
                    child.material = material;
                    child.material.needsUpdate = true;
                }
                if (child.name == 'Mesh039' || child.name == 'Mesh039_1') {
                    // console.log("Shoulder Inserts:", child.name);
                    child.material.color.set(formData?.shoulderInserts?.hex);
                }
                if (child.name.toLowerCase().includes('collar')) {
                    if (!child.name.toLowerCase().includes(formData.collar)) {
                        // console.log("Collar:", child.name);
                        const material = new THREE.MeshStandardMaterial({
                            map: transparentPatch,
                            transparent: true,
                        });
                        child.material = material;
                        child.material.needsUpdate = true;
                    } else {
                        const material = new THREE.MeshStandardMaterial({
                            // map: transparentPatch,
                            transparent: false,
                            color: formData?.body?.hex
                        });
                        child.material = material;
                        child.material.needsUpdate = true;
                    }
                }
            }
        });
    }, [scene, formData, patchs]);
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
            <primitive object={scene} scale={0.4} />;
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
