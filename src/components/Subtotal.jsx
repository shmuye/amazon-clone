import { useNavigate } from "react-router-dom";
import {useStateValue} from "./StateProvider.jsx";
import { getBasketTotal } from "../reducer.js";


const Subtotal = () => {
    const [{ basket }] = useStateValue();
    const navigate = useNavigate();


    const formattedValue = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
    }).format(
       getBasketTotal(basket)
    );

    return (
        <div className="flex flex-col justify-between w-[300px] gap-3 p-5 bg-white 
                        rounded-[3px]">
            <p>
                Subtotal ({ basket?.length} items):
                <strong> {formattedValue}</strong>
            </p>

            <small className="flex items-center">
                <input 
                className='mr-[5px]'
                type="checkbox" />
                This order contains a gift
            </small>

            <button
               className='bg-yellow-300 rounded-full w-full p-2 text-[#111] text-sm'
               onClick={e => navigate("/payment")} 
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default Subtotal;
