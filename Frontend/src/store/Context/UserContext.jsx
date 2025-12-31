import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <UserContext.Provider
      value={{ preview, setPreview, isUploading, setIsUploading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
