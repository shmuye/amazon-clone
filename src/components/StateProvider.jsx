import React, { createContext, useContext, useReducer } from 'react';

// prepare the data layer

export const StateContext = createContext();

// Wrap our app and provide the data Layer

export const StateProvider = ({ reducer, initialState, children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

// pull information from the data layer

export const useStateValue = () => useContext(StateContext);