import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const PatchCrop = ({ patch, open, setOpen, addToPatchArray }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(croppedImage){
            console.log('croppedImage',croppedImage)
            addToPatchArray({ ...patch, texture: croppedImage })
            setOpen(false);
        }
    }, [croppedImage])
    const getCroppedImage = async () => {
        try {
            if (!croppedAreaPixels) return;
            
            const imageSrc = await createImage(patch?.texture);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
    
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
    
            ctx.drawImage(
                imageSrc,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );
    
            // Convert canvas to Blob and create URL
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Canvas to Blob failed");
                    return;
                }
                const croppedImageUrl = URL.createObjectURL(blob);
                setCroppedImage(croppedImageUrl);
            }, "image/png");
            
        } catch (error) {
            console.error("Error cropping image", error);
        }
    };
    

    return (
        <>
            <Modal open={open} onClose={onClose} center>
                <div className="crop-container" style={{ width: "100%", height: "300px", position: "relative" }}>
                    <Cropper                    
                        image={patch?.texture}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        objectFit="contain"
                    />
                </div>

                {/* Zoom Control */}
                <div className="controls">
                    <label htmlFor="">Zoom</label>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="zoom-range"
                    />
                </div>

                {/* Crop Button */}
                <button onClick={() => setOpen(false)} className="cancel-button">Cancel</button>
                <button onClick={getCroppedImage} className="crop-button">Crop Image</button>
            </Modal>
        </>
    );
};

// Helper function to load image
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });

export default PatchCrop;
