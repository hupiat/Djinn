// -----------------------------------------------------
// COMMONS
// -----------------------------------------------------

export type ContextChildren =
  | JSX.Element
  | JSX.Element[]
  | Array<JSX.Element | undefined>;

export type DML_Operation = "add" | "edit" | "delete";

export interface HandshakeInitDTO {
  apiPrefix: string;
}

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

export type EquipmentAttributeType =
  | "int"
  | "double"
  | "date"
  | "string"
  | "boolean";

export interface EquipmentAttribute extends BusinessObject {
  type: EquipmentAttributeType;
  value?: number | Date | string | boolean;
}

export interface Equipment extends BusinessObject {
  attributes: EquipmentAttribute[];
}

// -----------------------------------------------------
// OTHERS (utilities)
// -----------------------------------------------------

export type WithoutId<T extends IIdentified> = Omit<T, "id"> &
  Partial<Pick<T, "id">>;

export type OrArray<T> = T | T[];

export type DicoOf_Ids_And_Fields<T extends IIdentified> = {
  [id: number]: (keyof T)[];
};

export type DicoOf_Fields<T extends IIdentified, ValueType = string> = {
  [field in keyof T]: ValueType;
};
