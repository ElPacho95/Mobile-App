export interface Root {
  subscribers: number;
  view: number;
  coverage: number;
  favourites: number;
  postsForwarding: number;
  uniqueChats: number;
  geography: Geography[];
  orders: number;
}

export interface Geography {
  city: string;
  count: number;
}

export interface Body {
  gender: string;
  from: Date;
  to: Date;
  minAge: Date;
  maxAge: Date;
}
