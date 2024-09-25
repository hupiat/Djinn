import React, { useState } from "react";
import { useContext } from "react";
import { Account, ContextChildren } from "../types";
import DataStore from "./DataStore";
import { API_ACCOUNTS, API_PREFIX } from "./paths";
import { useStoreDataAccounts } from "./hooks";

interface IMiddlewareContext {
  user: Account | null;
  setUser: (user: Account | null) => Promise<void>;
  // Note this datastore should always be fetched from context for
  // performances concern
  storeDataAccounts: DataStore<Account>;
}

const SetupMiddlewareContext = React.createContext<
  IMiddlewareContext | undefined
>(undefined);

interface IProps {
  children?: ContextChildren;
}

const MiddlewareContext = ({ children }: IProps) => {
  const [user, setUserState] = useState<Account | null>(null);

  // Init data stores static logs
  const [, storeDataAccounts] = useStoreDataAccounts();

  // State reducer (login + logout)
  const setUser = async (user: Account | null): Promise<void> => {
    if (!user) {
      DataStore.doFetch(`${API_PREFIX}/${API_ACCOUNTS}/logout`, (url) =>
        fetch(url, {
          method: "DELETE",
        })
      ).then(async (res) => {
        const json = (await res?.json()) as Account;
        setUserState(json);
        // Toast.show({
        //   type: "info",
        //   text1: "Logout",
        //   text2: "You have been logged out",
        // });
      });
      //.catch(displayErrorToast);
    } else {
      DataStore.doFetch(`${API_PREFIX}/${API_ACCOUNTS}/login`, (url) =>
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      )
        .then(async (res) => {
          if (res!.status == 404) {
            throw Error("Bad credentials");
          } else {
            // Toast.show({
            //   type: "info",
            //   text1: "Login",
            //   text2: "You have been logged",
            // });
            return await res!.json();
          }
        })
        .then((json) => setUserState(json));
      // .catch(() =>
      // displayErrorToast({
      //   name: "Error",
      //   message: "Bad credentials",
      // })
      // );
    }
  };

  return (
    <SetupMiddlewareContext.Provider
      value={{
        user,
        setUser,
        storeDataAccounts,
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
