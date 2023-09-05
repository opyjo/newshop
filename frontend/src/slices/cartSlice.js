import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//In summary, createSlice is part of a global state management solution (Redux),
//while useReducer is used for local state management within a component.
//createSlice abstracts some of the repetitive parts of defining actions and reducers, whereas useReducer offers a straightforward way to handle state transitions.

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // Extracts the payoad from the diapatched action to get the item that should be added to the cart
      const item = action.payload;
      //Checks if the item already exists in the cart using the '_id' property
      const existItem = state.cartItems.find((x) => x._id === item._id);
      // if the item already exists in the cart, it is replaced with the new item
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // calculate items price
      return updateCart(state);
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // calculate items price
      return updateCart(state);
    },

    clearCartItems(state, action) {
      state.cartItems = [];
      // calculate items price
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
