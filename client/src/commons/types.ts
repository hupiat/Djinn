// --------------------------------------
// TECHNICAL
// --------------------------------------

export type ContextChildren =
  | JSX.Element
  | JSX.Element[]
  | Array<JSX.Element | undefined>;

export type WorkflowStep = "read" | "add" | "edit" | "delete";

// --------------------------------------
// BUSINESS
// --------------------------------------

export interface BusinessObject {
  id: number;
  dateCreation: Date;
}

export interface Account extends BusinessObject {
  email: string;
  username: string;
  token?: string;
  picture?: string;
  // Will not be present from fetching, even encrypted
  password?: string;
}

// -----------------------------------------------------
// OTHERS (utilities)
// -----------------------------------------------------

export type WithoutId<T extends BusinessObject> = Omit<
  Omit<T, "dateCreation">,
  "id"
> &
  Partial<Pick<T, "id">> &
  Partial<Pick<T, "dateCreation">>;
