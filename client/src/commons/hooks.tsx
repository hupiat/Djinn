import { useCallback, useEffect, useMemo } from "react";
import { BusinessObject, DicoOf_Fields, OrArray, OrUndefined } from "./types";
import { Schema } from "schema-typed";
import { ErrorMessageType, SchemaCheckResult } from "schema-typed/lib/types";
import { useDeferredValue } from "react";
import DataStore from "./middleware/DataStore";

// TODO : rien ne marche ici

export const useEffectWhenSync = (
  isSync: () => boolean,
  callback: () => void,
  ...deps: any[]
) => {
  let tmpDeps = isSync() ? deps : undefined;
  if (tmpDeps) {
    tmpDeps = [...tmpDeps, callback, isSync];
  }

  console.log(deps, tmpDeps);

  useEffect(() => {
    if (isSync()) {
      callback();
    }
  }, tmpDeps);
};

type FormValidating<
  T extends BusinessObject
  // Remote extends boolean = false
> = {
  isValid: // Remote extends false
  /*?*/ (obj: T) => boolean;
  // : OrUndefined<(obj: T) => boolean>;
  getErrorFields: // Remote extends false
  /*?*/ (obj: T) => (keyof T)[];
  // : OrUndefined<(obj: T) => (keyof T)[]>;
  getErrorMessages: // Remote extends false
  /*?*/ (obj: T) => DicoOf_Fields<T>;
  // : OrUndefined<(obj: T) => DicoOf_Fields<T>>;
  //   getRemoteFormValidating: // Remote extends false
  //     ? (obj: T) => FormValidating<T, true>
  //     : undefined;
};
export const useValidation = <
  T extends BusinessObject
  // Remote extends boolean = false
>(
  state: OrArray<T>,
  schema: Schema<T>
  // store?: DataStore<T>
): FormValidating<T /*, Remote*/> => {
  const isArray = useMemo<boolean>(() => Array.isArray(state), [state]);

  type ModelType = {
    id: number;
    value: SchemaCheckResult<T, ErrorMessageType>;
  };
  const memoModelCheck = useMemo<ModelType[]>(() => {
    const process = (obj: T) => ({
      id: obj.id,
      value: schema.check(obj),
    });
    if (!isArray) {
      return [process(state as T)];
    }
    const res = [];
    for (const obj of state as T[]) {
      res.push(process(obj));
    }
    return res;
  }, [state, schema, isArray]);

  const deferredCheck = useDeferredValue(memoModelCheck);

  const getModelById = useCallback(
    (id: number): ModelType => deferredCheck.find((m) => m.id === id)!,
    [deferredCheck]
  );

  //   const remoteFormValidating = useValidation<T, true>(state, schema, store);

  //   const getRemoteFormValidating = useCallback(
  //     (obj: T) => {
  //       return {
  //         isValid: () => remoteFormValidating.isValid!(obj),
  //         getErrorFields: () => remoteFormValidating.getErrorFields!(obj),
  //         getErrorMessages: () => remoteFormValidating.getErrorMessages!(obj),
  //         getRemoteFormValidating: undefined,
  //       };
  //     },
  //     [remoteFormValidating]
  //   );

  return {
    isValid: useCallback(
      (obj: T): boolean => {
        return Object.values(getModelById(obj.id).value).every(
          (val) => !val.hasError
        );
      },
      [getModelById]
    ),
    getErrorFields: useCallback(
      (obj: T): (keyof T)[] => {
        const res = [] as (keyof T)[];
        const model = getModelById(obj.id).value;

        Object.entries(model)
          .filter((e) => e[1].hasError)
          .map((e) => e[0] as keyof T)
          .forEach((field) => res.push(field));

        return res;
      },
      [getModelById]
    ),
    getErrorMessages: useCallback(
      (obj: T): DicoOf_Fields<T> => {
        const res = {} as DicoOf_Fields<T>;
        const model = getModelById(obj.id).value;

        Object.entries(model)
          .filter((e) => e[1].hasError)
          .map((e) => ({
            [e[0] as keyof T]: e[1].errorMessage,
          }))
          .forEach((obj) => Object.assign(res, obj));

        return res;
      },
      [getModelById]
    ),
    // getRemoteFormValidating:
    //   remoteFormValidating && !remoteFormValidating.getRemoteFormValidating
    //     ? getRemoteFormValidating
    //     : undefined,
  };
};
