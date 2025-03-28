/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { User, ImageOff, Maximize2, X, RefreshCw } from "lucide-react";
import { ClipLoader } from "react-spinners";
import FileService from "../../services/file.service";
import { RotateCw } from 'lucide-react';

interface CustomNetworkImageProps {
  fileKey: string;
  height?: number | string;
  width?: number | string;
  borderRadius?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  isPerson?: boolean;
  className?: string;
  showViewIcon?: boolean;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  alt?: string;
}

const CustomNetworkImage: React.FC<CustomNetworkImageProps> = ({
  fileKey,
  height = 100,
  width = 100,
  borderRadius = 0,
  objectFit = "cover",
  objectPosition = "center",
  isPerson = false,
  className = "",
  showViewIcon = false,
  containerClassName = "",
  containerStyle = {},
  alt = "Image",
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const apiService = new FileService();

  useEffect(() => {
    let mounted = true;

    const fetchImageUrl = async () => {
      if (!fileKey) {
        setError("Invalid file key");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await apiService.getFileUri(fileKey);
        
        if (mounted && response) {
          setImageUrl(response);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        if (mounted) {
          setError("Failed to load image");
          setIsLoading(false);
        }
      }
    };

    fetchImageUrl();
    
    return () => {
      mounted = false;
    };
  }, [fileKey, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  // Combine the provided container style with defaults
  const finalContainerStyle: React.CSSProperties = {
    height,
    width,
    borderRadius: `${borderRadius}px`,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f3f4f6", // Light gray background
    ...containerStyle,
  };

  // Image style handles the object fit and position
  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit,
    objectPosition,
    transition: "opacity 0.3s ease",
  };

  // Render the image with loading and error states
  return (
    <>
      <div 
        className={`relative ${containerClassName}`}
        style={finalContainerStyle} 
        onClick={() => showViewIcon && setShowModal(true)}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <ClipLoader size={20} color="#2A9D8F" />
          </div>
        )}

        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            {isPerson ? (
              <User className="text-gray-400 mb-1" size={24} />
            ) : (
              <ImageOff className="text-gray-400 mb-1" size={24} />
            )}
            <button 
              onClick={handleRetry}
              className="mt-1 text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        ) : (
          imageUrl && (
            <div className="w-full h-full relative group">
              <img
                src={imageUrl}
                alt={alt}
                className={`w-full h-full ${className}`}
                style={imageStyle}
                onError={() => setError("Image failed to load")}
              />
              
              {showViewIcon && (
                <div className="absolute bottom-2 right-2 bg-black/50 rounded-full p-1.5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <Maximize2 className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Full-screen image modal */}
      {showModal && imageUrl && (
        <ImageModal 
          imageUrl={imageUrl}
          onClose={() => setShowModal(false)}
          alt={alt}
        />
      )}
    </>
  );
};



const ImageModal = ({ imageUrl, onClose, alt }: any) => {
  const [rotation, setRotation] = useState(0);
  
  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-[80vh] w-full">
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-[80vh] object-contain mx-auto rounded shadow-lg transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleRotate}
            className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
            aria-label="Rotate image"
          >
            <RotateCw className="h-5 w-5" />
          </button>
          
          <button
            onClick={onClose}
            className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="mt-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <X className="h-4 w-4" /> Close Image
      </button>
    </div>
  );
};

export default CustomNetworkImage;