import React, { Dispatch, SetStateAction } from "react";
import { useState, useContext } from "react";
import { ContextChildren } from "../../commons/types";
import { PATH_EQUIPMENTS } from "./paths";

const DEFAULT_PATH = PATH_EQUIPMENTS;

interface ISidebarContext {
  currentSidebarPath: string;
  setCurrentSidebarPath: Dispatch<SetStateAction<string>>;
}

const SetupSidebarContext = React.createContext<ISidebarContext | undefined>(
  undefined
);

interface IProps {
  children?: ContextChildren;
}

const SidebarContext = ({ children }: IProps) => {
  const [currentPath, setCurrentPath] = useState<string>(DEFAULT_PATH);

  return (
    <SetupSidebarContext.Provider
      value={{
        currentSidebarPath: currentPath,
        setCurrentSidebarPath: setCurrentPath,
      }}
    >
      {children}
    </SetupSidebarContext.Provider>
  );
};

export const useSidebarContext = (): ISidebarContext => {
  const context = useContext(SetupSidebarContext);
  if (!context) {
    throw Error("Context is not mounted");
  }
  return context;
};

export default SidebarContext;
