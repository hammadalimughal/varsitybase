import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, useGLTF, Text, useProgress } from '@react-three/drei';
import loadingGif from '../assets/images/loading.gif'

const Loader = () => {
    const { progress } = useProgress(); // Get loading progress
    return (
        <div className='model-loading'>
            <img src={loadingGif} alt="Loading" />
            <h6>Loading {progress}%</h6>
        </div>
    )
}

const ModelPatch = ({ patch }) => {
    const patchTexture = useTexture(patch?.texture);
    return (
        <mesh
            position={patch?.adjustment?.position}
            // position={[-1.55, 0.5, -0.2]}
            rotation={patch?.adjustment?.rotation}
            // rotation={[0.4, 4.5, 0]}
            // scale={[1.7, 1.7, 1.7]}
            scale={patch?.adjustment?.scale}
        >
            <planeGeometry args={[0.8, 0.8]} />
            <meshStandardMaterial map={patchTexture} transparent />
        </mesh>
    );
};

const ProductModel = ({ modelPath, patchs }) => {
    console.log('patch', patchs);
    const { scene } = useGLTF(modelPath);

    useEffect(() => {
        scene.traverse((child) => {
            console.log("Mesh Name:", child.name);
        });
    }, [scene]);

    scene.position.set(0, -2, 0);

    return (
        <>
            {patchs.length > 0 && patchs.map((item, index) => (
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
            ))}
            <primitive object={scene} scale={2} />;
        </>
    );
};

const ProductViewer = ({ modelPath, patchs }) => {
    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <Suspense fallback={<Loader />}>
                <Canvas style={{ width: '100%', height: '100%', display: 'block' }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 5]} />
                    <ProductModel modelPath={modelPath} patchs={patchs} />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </Suspense>
            {/* <Loader /> */}
        </div>
    );
};

export default ProductViewer;
