import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "../css/ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams();

  const product = products.find(p => p.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product_detail">
      <img src={product.image} alt={product.title} />

      <div className="product_info">
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
         <div className="product_rating">
                {
                    Array(product.rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))
                }

            </div>
        <p className="description">{product.description}</p>

        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
