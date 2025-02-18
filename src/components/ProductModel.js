import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, useGLTF } from '@react-three/drei';

const ProductModel = ({ modelPath, texturePath, patchTexture }) => {
    const { scene } = useGLTF(modelPath);
    scene.position.set(0, -2, 0);
    const patch = useTexture(patchTexture);
    return <>
        <primitive object={scene} scale={2} />; // Scale down the model to fit
        <mesh position={[0, 0.5, 0.8]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial map={patch} transparent />
        </mesh>
    </>
};

const ProductViewer = ({ modelPath, texturePath }) => {
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
                <ProductModel modelPath={modelPath} texturePath={texturePath} />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};

export default ProductViewer;