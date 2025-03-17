import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, useGLTF, useProgress } from '@react-three/drei';
import loadingGif from '../assets/images/loading.gif'
import * as THREE from 'three'
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
//     'Patch_Collar_Back',
//     'Patch_Collar_RetroSailor',
//     'patch_collar_sailorwithzipper',
//     'patch_LeftPocket_down',
//     'patch_LeftPocket_down_tilted',
//     'patch_LeftPocket_up',
//     'patch_LeftPocket_up_tilted',
//     'patch_RightPocket_down',
//     'patch_RightPocket_down_tilted',
//     'patch_RightPocket_up',
//     'patch_RightPocket_up_tilted'
// ]

const ProductModel = ({ modelPath, patchs, formData }) => {
    const { scene } = useGLTF(modelPath);
    const validTextures = patchs.map(patch => patch.texture).filter(Boolean);
    const textures = useTexture(validTextures);
    const transparentPatch = useTexture(transparentImage);
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                console.log('child',child.name)
                if (child.name.toLowerCase().includes('patch')) {
                    const patch = patchs.find(p => p.position === child.name);
                    console.log(child.name, patch)
                    if (patch) {
                        if (patch.type === 'image') {
                            const index = patchs.indexOf(patch);
                            const texture = textures[index];
                            texture.flipY = false;
                            texture.needsUpdate = true;
                            const material = new THREE.MeshStandardMaterial({
                                map: texture,
                                transparent: true,
                            });
                            child.material = material;
                            child.material.needsUpdate = true;
                        } else if (patch.type === 'text') {
                            debugger
                            // Add Text to the material
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            const fontSize = 50; // Adjust as needed
                            context.font = `${fontSize}px Arial`;
                            const textWidth = context.measureText(patch.text).width;
                            canvas.width = textWidth;
                            canvas.height = fontSize;
                            context.font = `${fontSize}px Arial`;
                            context.fillStyle = '#000'; // Text color
                            context.fillText(patch.text, 0, fontSize);

                            const textTexture = new THREE.CanvasTexture(canvas);
                            textTexture.flipY = false;
                            textTexture.needsUpdate = true;

                            const material = new THREE.MeshStandardMaterial({
                                map: textTexture,
                                transparent: true,
                            });
                            child.material = material;
                            child.material.needsUpdate = true;

                        }
                    } else {
                        const material = new THREE.MeshStandardMaterial({
                            map: transparentPatch,
                            transparent: true,
                        });
                        child.material = material;
                        child.material.needsUpdate = true;
                    }
                }
                if (child.name === 'Jacket_snaps' || child.name === 'Mesh005') {
                    child.material.color.set(formData?.body?.hex);
                }
                if (child.name === 'sleeves_R' || child.name === 'sleeves_L') {
                    child.material.color.set(formData?.sleeves?.hex);
                }
                if (child.name === 'Pockets') {
                    child.material.color.set(formData?.pocket?.hex);
                }
                if (child.name === 'inside_body_zipper' || child.name === 'inside_Jacket_Snaps') {
                    child.material.color.set(formData?.insideLining?.hex);
                }
                if (child.name === 'Mesh037') {
                    child.material.color.set(formData?.snaps?.hex);
                }
                if (child.name === 'Mesh006_1') {
                    const material = new THREE.MeshStandardMaterial({
                        map: transparentPatch,
                        transparent: true,
                    });
                    child.material = material;
                    child.material.needsUpdate = true;
                }
                if (child.name === 'Mesh039' || child.name === 'Mesh039_1') {
                    child.material.color.set(formData?.shoulderInserts?.hex);
                }
                if (child.name.toLowerCase().includes('collar')) {
                    if (!child.name.toLowerCase().includes(formData.collar)) {
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
        </div>
    );
};

export default ProductViewer;
