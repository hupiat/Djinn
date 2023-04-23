import { ReactNode, useCallback, useMemo } from "react";
import {
  BusinessObject,
  DicoOf_Fields,
  FormValidating,
  OrArray,
  Toaster,
} from "./types";
import { Schema } from "schema-typed";
import { ErrorMessageType, SchemaCheckResult } from "schema-typed/lib/types";
import { useDeferredValue } from "react";
import { Notification, useToaster } from "rsuite";
import { MessageType } from "rsuite/esm/Notification/Notification";
import { ToastContainerProps } from "rsuite/esm/toaster/ToastContainer";

export function getToastApiMessage<T extends BusinessObject>(
  message: string,
  obj?: T
): ReactNode {
  return (
    <span>
      <b>[API]</b>
      <br />
      <br />
      {message}
    </span>
  );
}

export const useMyToast = (
  header: string,
  type: MessageType = "info",
  onClose: () => void = () => {},
  awaitAsync: boolean = false
): Toaster => {
  const toaster = useToaster();

  // Render

  const formatMessage = (message: ReactNode): JSX.Element => (
    <Notification header={header} type={type} onClose={onClose} closable>
      {message}
    </Notification>
  );

  // (coercions for typing mismatch in rsuite)
  const opts = {
    placement: "topEnd",
    duration: type === "error" ? 0 : 5000,
  } as ToastContainerProps;

  // Callbacks

  let toast;

  // (same)
  if (awaitAsync) {
    toast = async (message: ReactNode) =>
      (await toaster.push(formatMessage(message), opts)) as string;
  } else {
    toast = (message: ReactNode) =>
      toaster.push(formatMessage(message), opts) as string;
  }

  const clear = (key: string) => toaster.remove(key);
  const clearAll = () => toaster.clear();

  return {
    toast,
    clear,
    clearAll,
  };
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
