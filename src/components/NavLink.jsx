import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";

const NavLink = ({ onClick, redirectURL = ROUTES.HOME, upper, lower }) => (
  <Link
    to={redirectURL}
    onClick={onClick}
    className="text-white flex flex-col px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white/40"
  >
    <span className="text-[11px] sm:text-xs font-light leading-tight">
      {upper}
    </span>
    <span className="text-xs sm:text-sm font-semibold leading-tight">
      {lower}
    </span>
  </Link>
);

export default NavLink;
