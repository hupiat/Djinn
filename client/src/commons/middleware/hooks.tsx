import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import DataStore from "./DataStore";
import { BusinessObject, Asset } from "../types";
import { PATH_ASSETS } from "../../components/Sidebar/paths";
import { useMiddlewareContext } from "./context";

type StoreSnapshot<T extends BusinessObject> = [Array<T> | null, DataStore<T>];

// Initialization

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
  const { metadataInit } = useMiddlewareContext();
  const store = useRef<DataStore<T>>(
    new DataStore<T>(path, metadataInit?.apiPrefix)
  );

  useEffect(() => {
    store.current.formatUrlThenSet(path, metadataInit?.apiPrefix);
  }, [metadataInit, path]);

  const data = useStoreData(store.current);
  return [data, store.current];
};

// Business

export const useStoreDataAssets = (): StoreSnapshot<Asset> =>
  useStoreDataCreate<Asset>(PATH_ASSETS);
