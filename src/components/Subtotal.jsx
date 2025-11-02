import React from 'react';
import "../css/Subtotal.css";

const Subtotal = () => {

    const formattedValue = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
    }).format(0);

    return (
        <div className="subtotal">
            <p>
                Subtotal (0 items):
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
