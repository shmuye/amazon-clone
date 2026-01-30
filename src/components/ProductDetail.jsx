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
    <div className="product_detail">
      <img src={product.image} alt={product.title} />

      <div className="product_info">
        <h1>{product.title}</h1>
        <p className="description">{product.description}</p>
        <div className="product_rating">
               <span>Rating</span>
                {
                    Array(product.rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))
                }
        </div>
        <p className="price">${product.price}</p>
        <button
          onClick={addToBasket}
        >Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
