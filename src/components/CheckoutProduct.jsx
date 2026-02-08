import React from 'react'
import '../css/CheckoutProduct.css'
import {useStateValue} from "./StateProvider.jsx";

const CheckoutProduct = ({ id, image, title, description,  price, rating , hideButton}) => {

    const [{ basket }, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        })
    }

    return (
        <div className="flex">
        <div className='flex items-center my-5 border-b border-b-gray-300'>
            <img className="object-contain w-[180px] h-[180px]" src={image} alt="" />
            <div className="pl-5">
                <p className="text-[17px] font-bold ">{title}</p>
                <p className=''>{description}</p>
                <p className="flex items-center">
                    <span className='mr-2'>Rating: </span>
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}
                </p>
                {
                    !hideButton && (
                        <button
                             
                             onClick={removeFromBasket}
                             className="border-[1px] bg-[#f0c14b] mt-1 checkoutProduct_button text-[#111]
                               border-t-[#a88734] border-r-[#9c7e31] border-b-[#846a29] cursor-pointer
                             ">
                                Remove from Basket
                    </button>
                    )
                }
            </div>
            </div>
            <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
             </p>
            
        </div>

    )
}
 export default CheckoutProduct
