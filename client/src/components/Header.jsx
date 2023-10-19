import {BsSearch} from "react-icons/bs"
import {RxHamburgerMenu} from "react-icons/rx"
import {RiAccountBoxFill} from "react-icons/ri"
import { Link } from "react-router-dom"
import { useUserContext } from "../context/userContext"
const Header = () => {
  const {user} = useUserContext();
  return (
    <header className="flex justify-between">
          <a href="/" className="flex items-center">
            <img src='/airbnb.svg' height={100} width={100} className="hidden lg:flex" />
            <img src="/airbnb-1.svg" height={30} width={30} className="lg:hidden w-8 h-8 my-2" />
          </a>
          <div className="flex border border-gray-500 py-2 px-6 rounded-full gap-2 shadow-md shadow-gray-300">
            <div>Anywhere</div>
            <div className="border border-l border-gray-300"></div>
            <div>Any week</div>
            <div className="border border-l border-gray-300"></div>
            <div>Add guests</div>
            <div>
            <button className="rounded-full p-1 bg-red-600 text-white">
              <BsSearch size={20}/>
            </button>
            </div>
          </div>
          <Link to={user? '/account' : 'login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 ">
            <RxHamburgerMenu className="w-6 h-6"/>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <RiAccountBoxFill className="w-6 h-6"/>
            </div>
            {!!user &&(
                <div className="">
                  {user.name}
                </div>
              )}
          </Link>
        </header>
  )
}

export default Header
