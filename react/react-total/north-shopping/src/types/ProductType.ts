import { NavigateFunction } from "react-router-dom";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    count: number;
    rate: number;
  };
}

// 수량추가
export interface CartProduct extends Product {
  quantity: number;
}

export interface User {
  email: string;
  userId: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface CartStore {
  items: CartProduct[];
  cartItems: CartProduct[];
  cartCount: number;
  totalPrice: number;
  currentUser: string | null;

  fetchItems: () => void;
  getItemCategory: (category: string) => CartProduct[];
  addCart: (product: Product) => void;
  removeCart: (id: number) => void;

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  memberUser: (user: User, navigate?: (path: string) => void) => void;
  login: (user: LoginUser, navigate?: (path: string) => void) => void;
  logout: () => void;
}
