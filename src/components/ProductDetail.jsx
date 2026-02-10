import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "../css/ProductDetail.css"
import { useStateValue } from "./StateProvider";

const ProductDetail = () => {
  const { id } = useParams();
  const [ { basket }, dispatch ] = useStateValue()
  const product = products.find(p => p.id === id);

   const addToBasket = () => {
         dispatch({

                 type: "ADD_TO_BASKET",
                 item: {
                     id: product.id,
                     title: product.title,
                     price: product.price,
                     image: product.image,
                     rating: product.rating,
                     description: product.description
                 }
         })
    }

  

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div  className="
          flex items-start
          gap-[20px]
          p-[20px]
          max-w-[800px]
          m-0
          max-[900px]:flex-col
          max-[900px]:items-center
        ">
      <img 
         src={product.image} 
         alt={product.title} 
         className="
            w-[400px]
            h-auto
            object-contain
            max-[900px]:w-[300px]
          "
         
         />

      <div className="flex flex-col flex-1">
        <h1 className="text-[24px]">{product.title}</h1>
        <p className="mt-1">{product.description}</p>
        <div className="flex items-center gap-[4px]">
               <span>Rating</span>
                {
                    Array(product.rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))
                }
        </div>
        <p className="text-[22px] font-semibold">${product.price}</p>
        <button
         className="
            w-full
            h-[30px]
            bg-[#f0c14b]
            rounded-[20px]
            border
            border-t-[#a88734]
            border-l-[#9c7e31]
            border-b-[#846a29]
            border-r-[#9c7e31]
            font-extrabold
            mt-[4px]
            text-[#111]
          "
          onClick={addToBasket}
        >Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
