import { Dispatch, SetStateAction } from "react";

export interface Root {
  subscribers: number;
  view: number;
  coverage: number;
  favourites: number;
  postsForwarding: number;
  uniqueChats: number;
  geography: Geography;
  orders: number;
}

export type Geography = {
  [key: string]: number;
};

export interface Body {
  gender: string;
  from: Date;
  to: Date;
  minAge: string | number;
  maxAge: string | number;
}

export type OpenedType = null | "age" | "gender" | "date";

export type GenderType = "MALE" | "FEMALE";

export interface Settings {
  openedType: string | null;
  from: Date;
  to: Date;
  minAge: string;
  maxAge: string;
  gender: GenderType;
}

export interface SetSettings {
  setOpenedType: Dispatch<SetStateAction<OpenedType>>;
  setFrom: Dispatch<SetStateAction<Date>>;
  setTo: Dispatch<SetStateAction<Date>>;
  setMinAge: Dispatch<SetStateAction<string>>;
  setMaxAge: Dispatch<SetStateAction<string>>;
  setGender: Dispatch<SetStateAction<GenderType>>;
}
