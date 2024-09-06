export interface WishItem {
  id: string;
  time: Date;
  name: string;
  tag: string;
  check: boolean;
}

export interface CreateWishItem {
  name: string;
  tag: string;
}

export interface UpdateWishItem {
  time?: Date;
  name?: string;
  tag?: string;
  check?: boolean;
}
