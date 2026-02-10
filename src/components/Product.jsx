import {useStateValue} from "./StateProvider.jsx";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Product = ({ id, title ,  image, }) => {
    const [{ basket }, dispatch ] = useStateValue()
    const navigate = useNavigate()
    return (
        
        <div 
         className="
                flex flex-col items-center justify-end
                flex-[1_1_250px]
                max-w-[200px]
                m-[10px]
                p-[20px]
                bg-white
                z-[1]
                cursor-pointer
                md:max-w-[200px]
                max-md:max-w-full
            "
         onClick={() => navigate(`/product/${id}`)}
         >
            <h3>{title}</h3>
            
            <img
                src={image}
                alt=""
                className="w-full h-[200px] object-contain mb-[15px]" 
            />
            
            <Link 
             className="whitespace-nowrap mt-[10px] text-[#0000ff] no-underline"
             to={`/product/${id}`}
             >
                Shop now
            </Link>
        </div>
    
    )
}
export default Product
