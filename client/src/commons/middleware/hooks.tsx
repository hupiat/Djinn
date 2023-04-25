import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import DataStore from "./DataStore";
import { BusinessObject, Asset, WorkflowStep, ResponseType } from "../types";
import { PATH_ASSETS } from "../../components/Sidebar/paths";
import { useMiddlewareContext } from "./context";
import { getToastApiMessage, useMyToaster } from "../hooks";

type StoreSnapshot<T extends BusinessObject> = [Array<T> | null, DataStore<T>];

// Initialization (synchro to API, data fetch)

const useStoreData = <T extends BusinessObject>(
  store: DataStore<T>,
  fetchAll: boolean
) => {
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
          if (fetchAll) {
            await store.fetchAll();
          } else {
            store.emptySynchronize();
          }
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
  path: string,
  fetchAll: boolean = true
): StoreSnapshot<T> => {
  // Toasts
  const title = "DataStore";
  const toasterInfo = useMyToaster(title);
  const toasterError = useMyToaster(title, "error");

  const logError = (details: Error) => {
    console.error(details);
    toasterError.toast(
      getToastApiMessage(details.name + " (see details in console)")
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

  const data = useStoreData(store.current, fetchAll);
  return [data, store.current];
};

// Business

export const useStoreDataAssets = (): StoreSnapshot<Asset> =>
  useStoreDataCreate<Asset>(PATH_ASSETS);

// Others (utilities)

export function useFetchOnce<T>(
  consumer: () => Promise<Response>,
  dataType?: ResponseType,
  setter?: React.Dispatch<React.SetStateAction<T>>
) {
  const res = useRef<Response>();
  const isPended = useRef<boolean>(false);
  useEffect(() => {
    if (!isPended.current) {
      isPended.current = true;
      const init = async () => {
        res.current = await consumer();
        if (setter) {
          let parsed;
          switch (dataType) {
            case "json":
              parsed = await res.current.json();
              break;
            case "blob":
              parsed = await res.current.blob();
              break;
            case "text":
              parsed = await res.current.text();
          }
          setter(parsed);
        }
      };
      init();
    }
  }, [consumer, dataType, setter]);

  return res.current;
}
