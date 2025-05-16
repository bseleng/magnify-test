import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

// Helper to get cropped image preview
function getCroppedImg(imageSrc, croppedAreaPixels, callback) {
  const image = new window.Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    callback(canvas.toDataURL());
  };
}

export default function PanOnlyCropper({
  imgSrc,
  frameWidth = 400,
  frameHeight = 400,
  initialCoords, // e.g. [[229, 261], [423, 261], [423, 451], [229, 451]]
  isDraggable
}) {
  // 1. Calculate bounding box from initialCoords
  const xs = initialCoords.map(c => c[0]);
  const ys = initialCoords.map(c => c[1]);
  const left = Math.min(...xs);
  const top = Math.min(...ys);
  const cropWidth = Math.max(...xs) - left;
  const cropHeight = Math.max(...ys) - top;

  const aspect = frameWidth / frameHeight;

  // 2. Calculate initial zoom so the crop area fills the frame
  // We need to know the image's natural size, so let's use a ref and effect
  const [imgDims, setImgDims] = useState(null);
  const [zoom, setZoom] = useState(5); // will be updated after image loads

  // 3. Calculate initial crop position
  // react-easy-crop uses crop {x, y} in percent of image, centered at 0,0
  // We'll calculate the offset to center the crop area in the frame
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  // 4. Cropped preview
  const [croppedUrl, setCroppedUrl] = useState(null);

  // When image loads, calculate initial zoom and crop
  React.useEffect(() => {

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    img.onload = () => {
      setImgDims({ width: img.naturalWidth, height: img.naturalHeight });

      // Calculate zoom so that cropWidth/cropHeight fills frameWidth/frameHeight
      const zoomX = frameWidth / cropWidth;
      const zoomY = frameHeight / cropHeight;
      const initialZoom = Math.min(zoomX, zoomY);

      setZoom(initialZoom *2 );

      // Calculate crop position so that the crop area is centered in the frame
      // react-easy-crop's crop.x/y are in percent of the image dimensions
      // Positive x moves image right (shows more left), positive y moves image down (shows more top)
      // The crop area is always the center of the frame, so:
      // Let's calculate the offset needed to align the crop area with the frame
      const centerX = left + cropWidth / 2;
      const centerY = top + cropHeight / 2;

      // Convert image center to percent of image size, then to crop coordinates
      const xPercent = ((img.naturalWidth / 2 - centerX) / (img.naturalWidth * initialZoom)) * 100;
      const yPercent = ((img.naturalHeight / 2 - centerY) / (img.naturalHeight * initialZoom)) * 100;

      setCrop({ x: xPercent, y: yPercent });
    };
  }, [imgSrc, frameWidth, frameHeight, left, top, cropWidth, cropHeight]);

  // Handle crop complete for preview
  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      getCroppedImg(imgSrc, croppedAreaPixels, setCroppedUrl);
    },
    [imgSrc]
  );

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ position: "relative", width: frameWidth, height: frameHeight }}>
        <Cropper
          image={imgSrc}
          crop={crop}
        zoom={zoom}
        maxZoom={10} // or any value you need  
          aspect={aspect}
          cropShape="rect"
          showGrid={false}
          onCropChange={ isDraggable ? setCrop : () =>{}}
          onZoomChange={ isDraggable ? setZoom : () =>{}}
          onCropComplete={onCropComplete}
          restrictPosition={false}
          style={{
            cropAreaStyle: { border: "none", boxShadow: "none", background: "none" }
          }}
        />
        {/* Hide crop area overlay completely */}
        <style>{`
          .reactEasyCrop_CropArea {
            border: none !important;
            box-shadow: none !important;
            background: none !important;
          }
        `}</style>
      </div>

    </div>
  );
}
