import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import DataStore from "./DataStore";
import { BusinessObject, Asset, WorkflowStep } from "../types";
import { PATH_ASSETS } from "../../components/Sidebar/paths";
import { useMiddlewareContext } from "./context";
import { getToastApiMessage, useMyToast } from "../hooks";

type StoreSnapshot<T extends BusinessObject> = [Array<T> | null, DataStore<T>];

// Initialization (synchro to API, data fetch)

const useStoreData = <T extends BusinessObject>(store: DataStore<T>) => {
  const [data, setData] = useState<T[] | null>(null);
  const dataDeferred = useDeferredValue(data);
  const storeDataDeferred = useDeferredValue(
    store.isSync() ? [...store.data!] : null
  );

  return useSyncExternalStore<T[] | null>(
    () => {
      const suscriber = (data: Set<T>) => setData([...data]);

      const init = async () => {
        // Fetching base data (getAll)
        if (!store.isSync() && store.hasAPI()) {
          await store.fetchAll();
        }

        // Then suscribing changes
        // Queries implemented in DataStore.ts
        // Need to stay in this closure
        store.subscribe(suscriber);
      };

      init();

      return () => store.unsubscribe(suscriber);
    },
    () => dataDeferred,
    () => storeDataDeferred
  );
};

// Creation

const useStoreDataCreate = <T extends BusinessObject>(
  path: string
): StoreSnapshot<T> => {
  // Toasts
  const title = "DataStore";
  const toasterInfo = useMyToast(title);
  const toasterError = useMyToast(title, "error");

  const logError = (details: Error) => {
    console.error(details);
    toasterError.toast(
      getToastApiMessage(
        "Error occurred : " + details.name + ", see details in console"
      )
    );
  };

  const logInfo = (op: WorkflowStep, obj: T) => {
    const juxtaposition = () => {
      switch (op) {
        case "read":
          return "fetched";
        case "add":
          return "added";
        case "edit":
          return "edited";
        case "delete":
          return "deleted";
      }
    };
    toasterInfo.toast(
      getToastApiMessage(
        `${obj.name} (${obj.id}) has been ${juxtaposition()}, (description : [${
          obj.description
        }])`,
        obj
      )
    );
  };

  // Then fetching API path

  const { metadataInit } = useMiddlewareContext();
  const store = useRef<DataStore<T>>(
    new DataStore<T>(
      path,
      logError,
      // For real it's a nested one generic type usage but coercion
      // is needed for storing a static ref
      logInfo as <T>(op: WorkflowStep, obj: T) => void,
      metadataInit?.apiPrefix
    )
  );

  useEffect(() => {
    store.current.formatUrlThenSet(path, metadataInit?.apiPrefix);

    return () => {
      toasterInfo.clearAll();
      toasterError.clearAll();
    };
  }, [metadataInit, path, toasterError, toasterInfo]);

  const data = useStoreData(store.current);
  return [data, store.current];
};

// Business

export const useStoreDataAssets = (): StoreSnapshot<Asset> =>
  useStoreDataCreate<Asset>(PATH_ASSETS);
