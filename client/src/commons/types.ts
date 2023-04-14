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

export interface BusinessObject {
  id: number;
  name: string;
  description: string;
}

export type BusinessObjectWithoutId<T extends BusinessObject> = Omit<T, "id"> &
  Partial<Pick<T, "id">>;

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
