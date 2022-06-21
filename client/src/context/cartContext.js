import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  products: [],
  subtotal: 0,
};

const reducer = (state, action) => {
  const { type, payload, total } = action;

  switch (type) {
    case "ADD_CART":
      return {
        products: payload,
        subtotal: total,
      };
    case "EMPTY_CART":
      return {
        products: [],
        subtotal: 0,
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};