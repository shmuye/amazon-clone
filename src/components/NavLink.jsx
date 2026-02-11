import { Link } from "react-router-dom"

const NavLink = ({onClick, redirectURL, upper, lower}) => {
  return (
    
    <Link 
        to={redirectURL} 
        onClick={onClick}>

        <div className="text-white flex flex-col mx-[10px]">
            <span className="text-[12px] font-light"> {upper}</span>
            <span className="text-[13px] font-semibold"> {lower}</span>
        </div>
        
    </Link>
  )
}

export default NavLink