import { useMemo, useRef, useSyncExternalStore } from "react";
import DataStore from "./DataStore";
import { BusinessObject, Equipment } from "../types";
import { PATH_EQUIPMENTS } from "../../components/Sidebar/paths";

export const useStoreData = <T extends BusinessObject>(store: DataStore<T>) => {
  const getData = () => store.data;
  const subscribe = useMemo(() => {
    return (notify: () => void) => {
      store.subscribe(notify);
      return () => {
        store.unsubscribe(notify);
      };
    };
  }, []);
  return useSyncExternalStore(subscribe, getData);
};

export const useStoreDataEquipments = (): [
  Set<Equipment> | undefined,
  DataStore<Equipment>
] => {
  const store = useRef<DataStore<Equipment>>(
    new DataStore<Equipment>(PATH_EQUIPMENTS)
  );
  const data = useStoreData<Equipment>(store.current);
  return [data, store.current];
};
