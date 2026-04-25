export interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
}
export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartType {
  cartId: number;
  items: CartItemType[];
  totalAmount: number;
  createdAt: Date;
}

export interface PlanType {
  id: number;
  goal: string;
  budget: number;
  category: string;
  deadline: string;
}
