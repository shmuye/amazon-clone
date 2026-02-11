import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const categories = [
  { value: "all", label: "All" },
  { value: "books", label: "Books" },
  { value: "electronics", label: "Electronics" },
  { value: "clothes", label: "Clothes" },
  { value: "beauty", label: "Beauty & personal care" },
];

const SearchBar = () => {
  const spanRef = useRef(null);
  const [selected, setSelected] = useState("All");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.offsetWidth + 24);
    }
  }, [selected]);

  return (
    <div className="flex flex-1 items-center">
      <span
        ref={spanRef}
        className="absolute invisible whitespace-nowrap text-[12px] px-2"
      >
        {selected}
      </span>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ width }}
        className="w-auto px-2 rounded-l-sm outline-none left-0 text-[12px]  h-[40px] border-r bg-gray-300 border-gray-500 focus:ring-2 focus:ring-yellow-500"
      >
        {categories.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <input
        className="outline-none border-none h-[40px] px-4 border-none w-full bg-white focus:ring-2 focus:ring-yellow-500"
        type="text"
        placeholder="Search Amazon"
      />
      <Search
        size={48}
        className="rounded-r-sm p-[8px] h-[40px]  bg-[#cd9042] cursor-pointer focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
};

export default SearchBar;
