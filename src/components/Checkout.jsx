import React from 'react'
import "../css/Checkout.css"
import Subtotal from "./Subtotal.jsx";
import {useStateValue} from "./StateProvider.jsx";
import CheckoutProduct from "./CheckoutProduct.jsx";
  

const Checkout = () => {
    const [{ basket, user }, dispatch] = useStateValue()
    return (
        <div className="flex items-start m-2 flex-col md:flex-row gap-10 p-[20px]">
            <div className="">
                  
                <div className="bg-white p-4">
                    <div className='p-3 flex justify-between border-b-[1px] border-gray-300'>
                    <h2 className="text-2xl self-start font-semibold">
                        Shopping Cart
                    </h2>
                    <p className='text-sm self-end'>Price</p>
                    </div>
                   
                  
                    {
                        basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                description={item.description}
                            />
                        ))
                    }

                </div>
            </div>
            <div className="bg-white">
               <Subtotal />
            </div>
        </div>
    )
}
export default Checkout
