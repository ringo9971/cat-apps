export interface FoodMenu {
  menus: Array<string>;
}

export interface WeeklyMenu {
  mon: FoodMenu;
  tue: FoodMenu;
  wed: FoodMenu;
  thu: FoodMenu;
  fri: FoodMenu;
  sat: FoodMenu;
  sun: FoodMenu;
}

export interface WishFood {
  id: string;
  time: Date;
  name: string;
}

export interface CreateWishFood {
  time: Date;
  name: string;
}
