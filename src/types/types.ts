export interface FormData {
  category: string | null;
  subCategory: string | null;
  requestDetails: string | null;
  gender: string | null;
  age: string | null;
  reason: { id: number; text: string | null } | null;
  style: string | null;
  polite: string | null;
}

export interface FormDataV2 {
  category: string | null;
  subCategory: string | null;
  subRelationship: string | null;
  requestDetails: string | null;
  age: string | null;
  reason: { id: number; text: string | null } | null;
  style: string | null;
  polite: string | null;
}

export interface OptionObject {
  id: number;
  text: string;
}
