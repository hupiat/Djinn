// -----------------------------------------------------
// COMMONS
// -----------------------------------------------------

import { ReactNode } from "react";

export type ContextChildren =
  | JSX.Element
  | JSX.Element[]
  | Array<JSX.Element | undefined>;

export type WorkflowStep = "read" | "add" | "edit" | "delete";

export type ResponseType = "json" | "text" | "blob";

export interface HandshakeInitDTO {
  apiPrefix: string;
}

export type Toaster = {
  toast: OrPromise<(message: ReactNode) => string>;
  clear: (key: string) => void;
  clearAll: () => void;
};

// -----------------------------------------------------
// BUSINESS
// -----------------------------------------------------

export interface IIdentified {
  id: number;
}

export interface BusinessObject extends IIdentified {
  name: string;
  description: string;
}

export interface Account extends BusinessObject {
  // Will not be present from fetching, even encrypted
  password: string;
}

export type AssetAttributeType =
  | "int"
  | "double"
  | "date"
  | "string"
  | "boolean";

export interface AssetAttribute extends BusinessObject {
  type: AssetAttributeType;
  value?: number | Date | string | boolean;
}

export interface Asset extends BusinessObject {
  attributes: AssetAttribute[];
}

// -----------------------------------------------------
// OTHERS (utilities)
// -----------------------------------------------------

export type WithoutId<T extends IIdentified> = Omit<T, "id"> &
  Partial<Pick<T, "id">>;

export type OrArray<T> = T extends Array<T> ? T[] : T;

export type OrUndefined<T> = T extends undefined ? undefined : T;

export type OrPromise<
  T extends ((...args: any) => any) | ((...args: any) => Promise<any>)
> =
  | T
  | (T extends (...args: any) => any
      ? (...args: any) => Promise<ReturnType<T>>
      : T);

export type DicoOf_Ids_And_Fields<T extends IIdentified> = {
  [id: number]: (keyof T)[];
};

export type DicoOf_Fields<T extends IIdentified, ValueType = string> = {
  [field in keyof T]: ValueType;
};
