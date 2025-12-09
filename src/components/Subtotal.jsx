import React from 'react';
import "../css/Subtotal.css";
import {useStateValue} from "./StateProvider.jsx";
import { getBasketTotal } from "../reducer.js";

const Subtotal = () => {
    const [{ basket }] = useStateValue();


    const formattedValue = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
    }).format(
       getBasketTotal(basket)
    );

    return (
        <div className="subtotal">
            <p>
                Subtotal ({ basket?.length} items):
                <strong> {formattedValue}</strong>
            </p>

            <small className="subtotal_gift">
                <input type="checkbox" />
                This order contains a gift
            </small>

            <button>Proceed to Checkout</button>
        </div>
    );
};

export default Subtotal;
