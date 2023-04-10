import { useEffect, useRef, useState } from "react";
import DataStore from "./DataStore";
import { BusinessObject, Equipment } from "../types";
import { PATH_EQUIPMENTS } from "../../components/Sidebar/paths";

type StoreSnapshot<T extends BusinessObject> = [
  Array<T> | undefined,
  DataStore<T>
];

export const useStoreData = <T extends BusinessObject>(
  store: DataStore<T>
): T[] | undefined => {
  const [data, setData] = useState<T[]>();

  useEffect(() => {
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

    // This reference should never update in practice
  }, [store]);

  return data;
};

export const useStoreDataEquipments = (): StoreSnapshot<Equipment> => {
  const store = useRef<DataStore<Equipment>>(
    new DataStore<Equipment>(PATH_EQUIPMENTS)
  );
  const data = useStoreData(store.current);
  return [data, store.current];
};
