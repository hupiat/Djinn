import { useCallback, useEffect, useMemo } from "react";
import { BusinessObject, DicoOf_Fields, OrArray } from "./types";
import { Schema } from "schema-typed";
import { ErrorMessageType, SchemaCheckResult } from "schema-typed/lib/types";

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

// TODO : à faire
// type FormValidating<T extends BusinessObject> = {
//   isValid: (obj: T) => boolean;
//   getErrorFields: (obj: T) => (keyof T)[];
//   getErrorMessages: (obj: T) => DicoOf_Fields<T, ErrorMessageType>;
//   getRemoteFormValidating: (obj: T) => FormValidating<T>;
// };
// export const useValidation = <T extends BusinessObject>(
//   state: OrArray<T>,
//   schema: Schema<T>
// ): FormValidating<T> => {
//   const isArray = useMemo<boolean>(() => Array.isArray(state), [state]);

//   const modelCheck = useMemo<
//     OrArray<SchemaCheckResult<T, ErrorMessageType>>
//   >(() => {
//     const process = (obj: T) => schema.check(obj);
//     if (isArray) {
//       return process(state as T);
//     }
//     return (state as T[]).map(process);
//   }, [state, schema, isArray]);

//   return {
//     isValid: useCallback((obj: T) => {
//         if (isArray) {

//         }
//     } , [isArray]),
//     getErrorFields: useCallback(() => {} , []);
//     getErrorMessages: useCallback(() => {} , []);
//     getRemoteFormValidating: useCallback(() => {} , []);
//   }
// };
