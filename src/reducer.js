import { ACTIONS } from "./constants/actions.js";

export const initialState = {
  basket: [],
  user: null,
  searchTerm: "",
};

export const getBasketTotal = (basket) =>
  basket.reduce((total, item) => total + item.price, 0);

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case ACTIONS.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index < 0) return state;

      const newBasket = [...state.basket];
      newBasket.splice(index, 1);
      return { ...state, basket: newBasket };
    }

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
