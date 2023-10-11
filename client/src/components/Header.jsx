import {BsSearch} from "react-icons/bs"
import {RxHamburgerMenu} from "react-icons/rx"
import {RiAccountBoxFill} from "react-icons/ri"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header className="flex justify-between">
          <a href="/" className="">
            <img src='/airbnb.svg' height={100} width={100} className="hidden lg:flex" />
            <img src="/airbnb-1.svg" height={30} width={30} className="lg:hidden" />
          </a>
          <div className="flex border border-gray-500 py-2 px-6 rounded-full gap-2 shadow-md shadow-gray-300">
            <div>Anywhere</div>
            <div className="border border-l border-gray-300"></div>
            <div>Any week</div>
            <div className="border border-l border-gray-300"></div>
            <div>Add guests</div>
            <button className="rounded-full p-1 bg-red-600 text-white">
              <BsSearch />
            </button>
          </div>
          <Link to={'/login'}>
          <div className="flex border border-gray-500 py-2 px-6 rounded-full gap-2 shadow-md shadow-gray-300">
            <RxHamburgerMenu className="relative top-1" size={20} />
            <div className="rounded-full border border-gray-300 bg-slate-400 p-1">
              <RiAccountBoxFill className="" size={20} />
            </div>
          </div>
          </Link>
        </header>
  )
}

export default Header
