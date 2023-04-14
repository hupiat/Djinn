import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ContextChildren, HandshakeInitDTO } from "../../commons/types";
import DataStore from "./DataStore";
import { PATH_METADATA } from "./paths";

interface IMiddlewareContext {
  metadataInit?: HandshakeInitDTO;
}

const SetupMiddlewareContext = React.createContext<
  IMiddlewareContext | undefined
>(undefined);

interface IProps {
  children?: ContextChildren;
}

const MiddlewareContext = ({ children }: IProps) => {
  const [handshakeInit, setHandshakeInit] = useState<HandshakeInitDTO>();

  useEffect(() => {
    DataStore.doFetch(PATH_METADATA, async (url) => {
      const res = await fetch(url + "/handshake");
      setHandshakeInit(await res.json());
    });
  }, [setHandshakeInit]);

  return (
    <SetupMiddlewareContext.Provider
      value={{
        metadataInit: handshakeInit,
      }}
    >
      {children}
    </SetupMiddlewareContext.Provider>
  );
};

export const useMiddlewareContext = (): IMiddlewareContext => {
  const context = useContext(SetupMiddlewareContext);
  if (!context) {
    throw Error("Context is not mounted");
  }
  return context;
};

export default MiddlewareContext;
