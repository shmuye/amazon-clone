import { useStateValue } from "./StateProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Product = ({ id, title, image }) => {
  const navigate = useNavigate();
  return (
    <div
      className="
                flex flex-col items-center justify-end
                flex-[1_1_250px]
                max-w-50
                m-2.5
                p-5
                bg-white
                z-1
                cursor-pointer
                md:max-w-50
                max-md:max-w-full
            "
      onClick={() => navigate(`/product/${id}`)}
    >
      <h3>{title}</h3>

      <img src={image} alt="" className="w-full h-50 object-contain mb-3.75" />

      <Link
        className="whitespace-nowrap mt-2.5 text-[#0000ff] no-underline"
        to={`/product/${id}`}
      >
        Shop now
      </Link>
    </div>
  );
};
export default Product;
