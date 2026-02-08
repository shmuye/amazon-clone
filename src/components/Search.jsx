import { Search } from "lucide-react"

const categories = [

   { value: "all", label: "All"},
   { value: "books", label: "Books"},
   { value: "electronics",label: "Electronics"},
   { value: "clothes", label: "Clothes"},
   { value: "beauty",label: "Beauty & personal care"}

]

const SearchBar = () => {

  return (
      <div className="flex flex-1 items-center rounded-[24px]">
                <select className="bg-[#aaa] left-0  h-[40px] w-fit border-r bg-white focus:ring-2 focus:ring-yellow-500">
                    {
                        categories.map(({value, label}) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
                </select>
                <input
                    className="h-[40px] px-4 border-none w-full bg-white"
                    type="text"
                    placeholder='Search Amazon'
                />
                <Search 
                   size={48}
                   className="p-[8px] h-[40px]  bg-[#cd9042] cursor-pointer" />
            </div>
  )
}

export default SearchBar