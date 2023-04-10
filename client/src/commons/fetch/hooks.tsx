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
    // Fetching base data (getAll)
    const init = async () => {
      await store.fetchAll();
      setData([...store.data!]);
    };
    init();

    // Suscribing changes
    // Queries implemented in DataStore.ts
    const suscriber = (data: Set<T>) => setData([...data]);
    store.subscribe(suscriber);

    return () => store.unsubscribe(suscriber);
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
