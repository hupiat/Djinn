import { useEffect, useRef, useState } from "react";
import DataStore from "./DataStore";
import { BusinessObject, Equipment } from "../types";
import { PATH_EQUIPMENTS } from "../../components/Sidebar/paths";
import { useMiddlewareContext } from "./context";
import { useEffectWhenSync } from "../hooks";

type StoreSnapshot<T extends BusinessObject> = [
  Array<T> | undefined,
  DataStore<T>
];

// Initialization

const useStoreData = <T extends BusinessObject>(
  store: DataStore<T>
): T[] | undefined => {
  const [data, setData] = useState<T[]>();

  useEffectWhenSync(
    // ! TODO : not working at all
    () => store.isSync(),
    () => {
      const suscriber = (data: Set<T>) => setData([...data]);

      // Fetching base data (getAll)
      const init = async () => {
        await store.fetchAll();
        setData([...store.data!]);

        // Then suscribing changes
        // Queries implemented in DataStore.ts
        // Need to stay in this closure
        store.subscribe(suscriber);
      };

      init();

      return () => store.unsubscribe(suscriber);
    },
    // This reference should never update in practice
    [store]
  );

  return data;
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
  }, [metadataInit?.apiPrefix, path]);

  const data = useStoreData(store.current);
  return [data, store.current];
};

// Business

export const useStoreDataEquipments = (): StoreSnapshot<Equipment> =>
  useStoreDataCreate<Equipment>(PATH_EQUIPMENTS);
