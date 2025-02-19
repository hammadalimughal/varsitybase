import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, useGLTF, Decal } from '@react-three/drei';


const ModelPatch = ({ patch }) => {
    const patchTexture = useTexture(patch?.texture);
    return (
        <mesh position={patch?.adjustment.position} rotation={patch?.adjustment.rotation} scale={[0.5, 0.5, 0.5]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshStandardMaterial map={patchTexture} transparent />
        </mesh>
    )
}

const ProductModel = ({ modelPath, texturePath, patchs }) => {
    console.log('patch', patchs)
    const { scene } = useGLTF(modelPath);
    const patchTexture = useTexture(patchs[0]?.texture);
    useEffect(() => {
        scene.traverse((child) => {
            console.log(child);  // Debugging: Check names in console
            console.log(child.name);  // Debugging: Check names in console
            // if(child.material.name == 'left-pocket'){
            //     child.material.map = patchTexture;  
            //     child.material.needsUpdate = true;
            // }
        });
    }, [scene]);
    scene.position.set(0, -2, 0);

    return <>
        {patchs.length > 0 && <>{patchs.map((item) => <ModelPatch patch={item} />)}</>}
        <primitive object={scene} scale={2} />;
    </>
};

const ProductViewer = ({ modelPath, texturePath, patchs }) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Update window size on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Canvas
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    position: 'relative',
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 5]} />
                <ProductModel modelPath={modelPath} texturePath={texturePath} patchs={patchs} />
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    );
};

export default ProductViewer;