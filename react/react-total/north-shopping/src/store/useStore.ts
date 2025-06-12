import { create } from "zustand";
import { CartStore } from "../types/ProductType";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  // getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const useStore = create<CartStore>((set, get) => ({
  items: [],
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
  currentUser: null, // 현재 사용자의 정보

  fetchItems: async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      set({ items: res.data });
      console.log(res.data);
    } catch (error) {
      console.log("데이터 에러");
    }
  },
  //    카테고리 별로
  getItemCategory: (category: string) => {
    const allItem = get().items;
    if (!category || category === "all") return allItem;
    return allItem.filter((item) => item.category === category);
  },

  // 장바구니 담기
  addCart: (product) => {
    set((state) => {
      const existing = state.cartItems.find((item) => item.id === product.id);

      let updateCart;
      if (existing) {
        updateCart = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updateCart = [...state.cartItems, { ...product, quantity: 1 }];
      }
      // const updateCount = state.cartCount + 1;
      const updateCount = updateCart.length;
      // reduce() 배열에 있는 데이터를 체크하면서 누적값과 현재값 매개변수로 반환
      const updateTotal = updateCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ); // sum의 초기값 0으로
      alert("상품이 장바구니에 담겼습니다.");
      return {
        cartItems: updateCart,
        cartCount: updateCount,
        totalPrice: updateTotal,
      };
    });
  },

  removeCart: (id: number) => {
    set((state) => {
      const updateCart = state.cartItems.filter((item) => item.id !== id);
      const updateCount = state.cartCount - 1;
      alert("상품이 삭제되었습니다.");

      return {
        cartItems: updateCart,
        cartCount: updateCount,
      };
    });
  },
  increaseQuantity: (id: number) => {
    set((state) => {
      const updateCart = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      const updateTotal = updateCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return {
        cartItems: updateCart,
        totalPrice: updateTotal,
      };
    });
  },
  decreaseQuantity: (id: number) => {
    set((state) => {
      const updateCart = state.cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const updateTotal = updateCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return {
        cartItems: updateCart,
        totalPrice: updateTotal,
      };
    });
  },

  // 회원가입
  memberUser: async (user, navigate) => {
    try {
      const { email, password } = user;
      // const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      await sendEmailVerification(firebaseUser);
      alert("회원가입에 성공하셨습니다");
      if (navigate) navigate("/login");
    } catch (error: any) {
      console.log(error);
      alert("회원가입 실패" + error.message);
    }
  },

  // 로그인
  login: async (user, navigate) => {
    try {
      const { email, password } = user;
      // const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        alert("이메일 인증이 필요합니다. 이메일 인증을 처리해주세요.");
        return;
      }
      set({ currentUser: userCredential.user.email });
      alert("로그인 되었습니다");
      if (navigate) navigate("/member");
    } catch (error: any) {
      alert("로그인 실패" + error.message);
    }
  },

  // 로그아웃
  logout: async () => {
    await signOut(auth);
    set({ currentUser: null });
    alert("로그아웃되었습니다");
  },
}));
