import {BsSearch} from "react-icons/bs"
import {RxHamburgerMenu} from "react-icons/rx"
import {RiAccountBoxFill} from "react-icons/ri"
import { Link,useNavigate} from "react-router-dom"
import { useState } from "react"
import { useUserContext } from "../context/userContext"
const Header = () => {
  const {user} = useUserContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search/'+searchQuery);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      e.preventDefault();
      navigate('/search/'+searchQuery);
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
        <div className="flex gap-1 w-[300px] md:w-[250px] lg:w-[400px]">
          <input type="text" value={searchQuery} placeholder="Search..."  onKeyDown={handleKeyDown} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="text-white">
            <BsSearch
              size={20}
              className="rounded-full h-10 w-10 bg-gray-400 p-2"
              onClick={handleSubmit}
            />
          </button>
        </div>
      <div className="flex gap-2">

        <Link
          to={user ? "/account" : "login"}
          className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4"         >
          <RxHamburgerMenu className="w-6 h-6" />
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <RiAccountBoxFill className="w-6 h-6" />
          </div>
          {!!user && (
            <div className="">{user.name}</div>
          )}
        </Link>
      </div>
      {/* {redirect && <Navigate to={'/places/results/' + search} />} */}
    </header>
  );
};

export default Header;
