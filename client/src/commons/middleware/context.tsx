import React, { useTransition, useState } from "react";
import { useContext } from "react";
import {
  Account,
  ContextChildren,
  HandshakeInitDTO,
} from "../../commons/types";
import DataStore from "./DataStore";
import { PATH_LOGOUT, PATH_METADATA } from "./paths";
import { useFetchOnce } from "./hooks";
import { useMyToaster } from "../hooks";

interface IMiddlewareContext {
  metadataInit?: HandshakeInitDTO;
  user: Account | null;
  setUser: (user: Account | null) => Promise<void | boolean>;
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
  const [pendingLogout, startLogout] = useTransition();
  const toasterErrorLogout = useMyToaster("Logout", "error");

  // Most adapted to fetch only once
  // Planned for consistant data aka to be more flexible, unlike user typically
  useFetchOnce(
    async () =>
      (await DataStore.doFetch(
        PATH_METADATA,
        async (url) => await fetch(url + "/handshake")
      )) as Response,
    "json",
    setHandshakeInit
  );

  // State reducer (local storage + logout)
  const setUser = async (user: Account | null): Promise<void | boolean> => {
    if (!user) {
      startLogout(() => {
        // Achi better pattern dependency there thanks to v18.xx, asmabaok hooks assumpted design
        // (cannot navigate at all adespi, will not hide an eventually error toast, maybe better to keep this)
        DataStore.doFetch(
          handshakeInit?.apiPrefix + "/" + PATH_LOGOUT,
          async (url) =>
            await fetch(url, {
              method: "DELETE",
            })
        )
          .then(() => {
            setUserState(user);
            localStorage.removeItem(SESSION_STORAGE_USER);
          })
          .catch(() => toasterErrorLogout.toast("Internal error"));
      });
      return pendingLogout;
    } else {
      localStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user));
      setUserState(user);
    }
  };

  // Init state from local storage
  if (!user) {
    let storage = localStorage.getItem(SESSION_STORAGE_USER);
    if (!!storage) {
      storage = JSON.parse(storage);
      setUserState(storage as any as Account);
    }
  }

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
