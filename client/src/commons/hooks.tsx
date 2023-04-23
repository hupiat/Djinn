import { useCallback, useEffect, useMemo } from "react";
import { BusinessObject, DicoOf_Fields, OrArray, OrUndefined } from "./types";
import { Schema } from "schema-typed";
import { ErrorMessageType, SchemaCheckResult } from "schema-typed/lib/types";
import { useDeferredValue } from "react";

export type FormValidating<T extends BusinessObject> = {
  isValid: (obj: T) => boolean;
  getErrorFields: (obj: T) => (keyof T)[];
  getErrorMessages: (obj: T) => DicoOf_Fields<T>;
};

export const useValidation = <T extends BusinessObject>(
  state: OrArray<T>,
  schema: Schema<T>
): FormValidating<T> => {
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
    (id: number): ModelType | undefined =>
      deferredCheck.find((m) => m.id === id),
    [deferredCheck]
  );

  return {
    isValid: useCallback(
      (obj: T): boolean => {
        const model = getModelById(obj.id);
        if (!model) {
          return false;
        }
        return Object.values(model.value).every((val) => !val.hasError);
      },
      [getModelById]
    ),
    getErrorFields: useCallback(
      (obj: T): (keyof T)[] => {
        const res = [] as (keyof T)[];
        const model = getModelById(obj.id);
        if (!model) {
          return res;
        }

        Object.entries(model.value)
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
        const model = getModelById(obj.id);
        if (!model) {
          return res;
        }

        Object.entries(model.value)
          .filter((e) => e[1].hasError)
          .map((e) => ({
            [e[0] as keyof T]: e[1].errorMessage,
          }))
          .forEach((obj) => Object.assign(res, obj));

        return res;
      },
      [getModelById]
    ),
  };
};
