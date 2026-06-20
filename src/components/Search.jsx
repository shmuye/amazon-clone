import { Search } from "lucide-react";
import { useStateValue } from "./StateProvider.jsx";
import { ACTIONS } from "../constants/actions.js";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const handleSearchChange = (e) => {
    dispatch({
      type: ACTIONS.SET_SEARCH,
      searchTerm: e.target.value,
    });
  };

  return (
    <div className="flex flex-1 items-stretch rounded-md overflow-hidden h-10">
      <input
        className="flex-1 min-w-0 px-3 sm:px-4 text-sm text-gray-900 bg-white border-0 outline-none focus:ring-2 focus:ring-[#f0c14b] focus:ring-inset"
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products"
        aria-label="Search products"
      />
      <button
        type="button"
        className="bg-[#febd69] hover:bg-[#f3a847] px-3 sm:px-4 flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Search"
      >
        <Search size={20} className="text-gray-900" aria-hidden="true" />
      </button>
    </div>
  );
};

export default SearchBar;
