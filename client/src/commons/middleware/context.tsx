import React, { useEffect, useState } from "react";
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
  setUser: (user: Account | null) => void;
}

const SetupMiddlewareContext = React.createContext<
  IMiddlewareContext | undefined
>(undefined);

interface IProps {
  children?: ContextChildren;
}

const SESSION_STORAGE_USER = "user_storage";

const MiddlewareContext = ({ children }: IProps) => {
  const [user, setUserState] = useState<Account | null>(null);
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

  const setUser = (user: Account | null) => {
    localStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user));
    setUserState(user);
  };

  useEffect(() => {
    if (!user) {
      // TODO : see for isAuthenticated() uri instead
      let storage = localStorage.getItem(SESSION_STORAGE_USER);
      if (!!storage) {
        storage = JSON.parse(storage);
        setUserState(storage as any as Account);
      }
    }
  }, [user, setUserState]);

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
