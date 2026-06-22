import { ACTIONS } from "./constants/actions.js";

export const initialState = {
  basket: [],
  user: null,
  searchTerm: "",
};

export const getItemQuantity = (item) => item.quantity ?? 1;

export const getBasketItemCount = (basket) =>
  basket.reduce((count, item) => count + getItemQuantity(item), 0);

export const getBasketTotal = (basket) =>
  basket.reduce(
    (total, item) => total + item.price * getItemQuantity(item),
    0,
  );

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_BASKET: {
      const amount = action.quantity ?? 1;
      const existingIndex = state.basket.findIndex(
        (item) => item.id === action.item.id,
      );

      if (existingIndex >= 0) {
        const newBasket = [...state.basket];
        newBasket[existingIndex] = {
          ...newBasket[existingIndex],
          quantity: getItemQuantity(newBasket[existingIndex]) + amount,
        };
        return { ...state, basket: newBasket };
      }

      return {
        ...state,
        basket: [...state.basket, { ...action.item, quantity: amount }],
      };
    }

    case ACTIONS.SET_BASKET_QUANTITY: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index < 0) return state;

      if (action.quantity <= 0) {
        return {
          ...state,
          basket: state.basket.filter((item) => item.id !== action.id),
        };
      }

      const newBasket = [...state.basket];
      newBasket[index] = { ...newBasket[index], quantity: action.quantity };
      return { ...state, basket: newBasket };
    }

    case ACTIONS.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    case ACTIONS.EMPTY_BASKET:
      return { ...state, basket: [] };

    case ACTIONS.SET_USER:
      return { ...state, user: action.user };

    case ACTIONS.SET_SEARCH:
      return { ...state, searchTerm: action.searchTerm };

    default:
      return state;
  }
};
