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

export interface SettingsState {
  modal: null | "date" | "age" | "gender";
  from: Date;
  to: Date;
  minAge: string;
  maxAge: string;
  gender: GenderType;
}

export type GenderType = "MALE" | "FEMALE";
