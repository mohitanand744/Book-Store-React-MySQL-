import { useContext } from "react";
import { LoaderContext } from "../store/Context/LoaderProvider";

export const useLoader = () => {
  return useContext(LoaderContext);
};
