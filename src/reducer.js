export const initialState = {
    basket: [],
}

// selector

export const getBasketTotal = (basket) => {
    return basket.reduce((amount, item) => amount + item.price, 0)
}

export const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                   basket:  [...state.basket, action.item]
            }
            default:
                return state;

    }
}