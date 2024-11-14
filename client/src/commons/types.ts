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

export const CVPartFields = [
  "first_name",
  "last_name",
  "location",
  "profile_picture_url",
  "headline",
  "websites",
  "summary",
  "work_experience",
  "volunteering_experience",
  "skills",
  "education",
  "certifications",
  "languages",
  "followers_count",
  "connections_count",
  "projects",
  "hashtags",
  "background_profile_url",
] as const;

export type CVPart = (typeof CVPartFields)[number];

export interface BusinessObject {
  id: number;
  dateCreation: Date;
}

export interface CVInformation extends BusinessObject {
  field: CVPart;
  value: string;
  isArray: boolean;
}

export interface Account extends BusinessObject {
  email: string;
  username: string;
  picture?: string;
  password?: string;
  linkedin?: string;
  informations?: CVInformation[];
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
