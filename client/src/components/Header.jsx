import {BsSearch} from "react-icons/bs"
import {RxHamburgerMenu} from "react-icons/rx"
import {RiAccountBoxFill} from "react-icons/ri"
import { Link,useNavigate  } from "react-router-dom"
import { useUserContext } from "../context/userContext"
import { useRef, useState } from "react"
const Header = () => {
  const searchRef = useRef();
  const [redirect, setRedirect] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleSubmit = () => {
    if (searchRef.current.value.length > 0) {
      setRedirect(true);
    }
  };

  if (redirect) {
    navigate('/places/results?search_query=' + searchRef.current.value);
  }

  return (
    <header className="flex justify-between gap-1">
        <a href="/" className="flex items-center">
            <img src='/airbnb.svg' height={100} width={100} className="hidden lg:flex" />
            <img src="/airbnb-1.svg" className="lg:hidden w-8 h-8" />
          </a>
          <div className="hidden border border-gray-500 py-2 px-4 rounded-full gap-2 shadow-md shadow-gray-300 md:flex">
            <div>Anywhere</div>
            <div className="border border-l border-gray-300"></div>
            <div>Any week</div>
            <div className="border border-l border-gray-300"></div>
            <div>Add guests</div>
            <div>
            </div>
          </div>
      <div className="flex gap-2">
        <div className="flex gap-1 w-[300px] md:w-[250px] lg:w-[400px]">
          <input type="text" ref={searchRef} placeholder="Search..." />
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
    </header>
  );
};

export default Header;
