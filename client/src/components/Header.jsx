import {BsSearch} from "react-icons/bs"
import {RxHamburgerMenu} from "react-icons/rx"
import {RiAccountBoxFill} from "react-icons/ri"
import { Link,Navigate  } from "react-router-dom"
import { useUserContext } from "../context/userContext"
import { useState } from "react"
const Header = () => {
  const [search,setSearch] = useState('')
  const [redirect, setRedirect] = useState(false);
  const { user,setQuery} = useUserContext();
  const handleSubmit = () => {
    if (search.length > 0) {
      console.log(search)
      // setQuery(search)
      setRedirect(true);
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && search.length > 0) {
      // console.log(search);
      setQuery(search)
      setRedirect(true);
    }
  };
  return (
    <header className="flex justify-between gap-1">
      <div className="flex items-center">
        <a href="/" >
            <img src='/airbnb.svg' height={100} width={100} className="hidden lg:flex" />
            <img src="/airbnb-1.svg" className="lg:hidden w-8 h-8" />
          </a>
      </div>
          <div className="hidden  border border-red-500  px-4 rounded-full gap-2 md:flex">
            <div className="flex items-center">Anywhere</div>
            <div className="border border-l border-gray-300"></div>
            <div className="flex items-center">Any week</div>
            <div className="border border-l border-gray-300"></div>
            <div className="flex items-center">Add guests</div>
            <div>
            </div>
          </div>
      <div className="flex gap-2">
        <div className="flex gap-1 w-[300px] md:w-[250px] lg:w-[400px]">
          <input type="text" value={search} placeholder="Search..."  onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} />
          <button className="text-white">
            <BsSearch
              size={20}
              className="rounded-full h-10 w-10 bg-gray-400 p-2"
              onClick={handleSubmit}
            />
          </button>
        </div>

        <Link
          to={user ? "/account" : "login"}
          className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4"
        >
          <RxHamburgerMenu className="w-6 h-6" />
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <RiAccountBoxFill className="w-6 h-6" />
          </div>
          {!!user && (
            <div className="">{user.name}</div>
          )}
        </Link>
      </div>
      {redirect && <Navigate to={'/places/results?search_query=' + search} />}
    </header>
  );
};

export default Header;
