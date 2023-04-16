import React, { Dispatch, SetStateAction } from "react";
import { useState, useContext } from "react";
import { ContextChildren } from "../../commons/types";
import { PATH_DEFAULT } from "./paths";
import Sidebar from ".";

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
  const [currentPath, setCurrentPath] = useState<string>(PATH_DEFAULT);

  return (
    <SetupSidebarContext.Provider
      value={{
        currentSidebarPath: currentPath,
        setCurrentSidebarPath: setCurrentPath,
      }}
    >
      <Sidebar />
      <div id="sidenav__container">{children}</div>
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
