import React, { Dispatch, SetStateAction, useState } from "react";
import { useContext } from "react";
import {
  Account,
  ContextChildren,
  HandshakeInitDTO,
} from "../../commons/types";
import DataStore from "./DataStore";
import { PATH_METADATA } from "./paths";
import { useFetchOnce } from "./hooks";

interface IMiddlewareContext {
  metadataInit?: HandshakeInitDTO;
  user: Account | null;
  setUser: Dispatch<SetStateAction<Account | null>>;
}

const SetupMiddlewareContext = React.createContext<
  IMiddlewareContext | undefined
>(undefined);

interface IProps {
  children?: ContextChildren;
}

const MiddlewareContext = ({ children }: IProps) => {
  const [user, setUser] = useState<Account | null>(null);
  const [handshakeInit, setHandshakeInit] = useState<HandshakeInitDTO>();

  useFetchOnce(
    async () =>
      (await DataStore.doFetch(
        PATH_METADATA,
        async (url) => await fetch(url + "/handshake")
      )) as Response,
    "json",
    setHandshakeInit
  );

  return (
    <SetupMiddlewareContext.Provider
      value={{
        metadataInit: handshakeInit,
        user,
        setUser,
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
