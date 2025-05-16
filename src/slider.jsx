import { useState, useEffect, useCallback } from "react";
import Magnifier from "react-magnifier";
import passport from "./assets/passport.jpg";
import regis from "./assets/registration.jpg";

const photos = [passport, regis];

function rotateImage(src, degrees, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  img.onload = () => {
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d");

    // Set canvas size based on rotation
    if (degrees % 180 === 0) {
      offCanvas.width = img.width;
      offCanvas.height = img.height;
    } else {
      offCanvas.width = img.height;
      offCanvas.height = img.width;
    }

    offCtx.translate(offCanvas.width / 2, offCanvas.height / 2);
    offCtx.rotate((degrees * Math.PI) / 180);
    offCtx.drawImage(img, -img.width / 2, -img.height / 2);

    callback(offCanvas.toDataURL());
  };
}

export default function Slider() {
  const [currentImage, setCurrentImage] = useState(0);
  const [rotatedImageSrc, setRotatedImageSrc] = useState("");

  const isRotated = currentImage === 1;

  const loadImage = useCallback(() => {
    const src = photos[currentImage];
    if (isRotated) {
      rotateImage(src, -90, setRotatedImageSrc);
    } else {
      setRotatedImageSrc(src);
    }
  }, [currentImage]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: 300, height: 400,  margin: "10px auto", display: "flex", alignItems: 'center'}}>
        {rotatedImageSrc && (
          <Magnifier
            src={rotatedImageSrc}
            width={300}
            zoomFactor={2}
          />
        )}
      </div>

      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
        {photos.map((item, i) => (
          <img
            key={i}
            src={item}
            alt={`thumb-${i}`}
            style={{
              width: "100px",
                transform: i === 1 ? "rotate(-90deg)" : "none",
               objectFit: "fill"
            }}
            onClick={() => setCurrentImage(i)}
          />
        ))}
      </div>
    </div>
  );
}