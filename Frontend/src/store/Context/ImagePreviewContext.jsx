import { createContext, useContext, useState } from "react";

const ImagePreviewContext = createContext();

export const ImagePreviewProvider = ({ children }) => {
  const [preview, setPreview] = useState({
    isOpen: false,
    src: "",
    alt: "",
  });

  const openPreview = (src, alt = "") => {
    setPreview({ isOpen: true, src, alt });
  };

  const closePreview = () => {
    setPreview((p) => ({ ...p, isOpen: false }));
  };

  return (
    <ImagePreviewContext.Provider
      value={{ preview, openPreview, closePreview }}
    >
      {children}
    </ImagePreviewContext.Provider>
  );
};

export const useImagePreview = () => useContext(ImagePreviewContext);
