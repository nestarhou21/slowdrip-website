// Categories come from the POS admin (Coffee, Matcha, Tea, Food, ...)
export type MenuCategory = string;

export interface MenuItem {
  id: number;
  name: string;
  priceM: string;
  priceL?: string;
  image: string;
  description: string;
  category: MenuCategory;
}
