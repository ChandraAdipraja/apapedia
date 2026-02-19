"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD"; payload: Omit<CartItem, "qty"> }
  | { type: "REMOVE"; id: number }
  | { type: "INC"; id: number }
  | { type: "DEC"; id: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: number) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  clear: () => void;
} | null>(null);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const exist = state.items.find((x) => x.id === action.payload.id);
      if (exist) {
        return {
          items: state.items.map((x) =>
            x.id === action.payload.id ? { ...x, qty: x.qty + 1 } : x,
          ),
        };
      }
      return { items: [{ ...action.payload, qty: 1 }, ...state.items] };
    }
    case "REMOVE":
      return { items: state.items.filter((x) => x.id !== action.id) };
    case "INC":
      return {
        items: state.items.map((x) =>
          x.id === action.id ? { ...x, qty: x.qty + 1 } : x,
        ),
      };
    case "DEC":
      return {
        items: state.items
          .map((x) => (x.id === action.id ? { ...x, qty: x.qty - 1 } : x))
          .filter((x) => x.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const count = useMemo(
    () => state.items.reduce((sum, x) => sum + x.qty, 0),
    [state.items],
  );

  const total = useMemo(
    () => state.items.reduce((sum, x) => sum + x.price * x.qty, 0),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      count,
      total,
      add: (item: Omit<CartItem, "qty">) =>
        dispatch({ type: "ADD", payload: item }),
      remove: (id: number) => dispatch({ type: "REMOVE", id }),
      inc: (id: number) => dispatch({ type: "INC", id }),
      dec: (id: number) => dispatch({ type: "DEC", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, count, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
