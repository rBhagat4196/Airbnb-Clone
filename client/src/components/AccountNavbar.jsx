import {AiOutlineUser} from "react-icons/ai"
import {BsListStars} from "react-icons/bs"
import {BiBuildingHouse} from "react-icons/bi"
import {Link, useLocation} from "react-router-dom"
const AccountNavbar = () => {
    const {pathname} = useLocation();

    const checkActive = (tab)=>{
        let subpage = pathname.split('/')?.[2];
        // console.log(subpage)
        if(subpage == undefined || subpage==''){
            subpage = 'profile'
        }
        if(tab == subpage){
          return 'bg-red-400';
        }
        else{
            return 'bg-gray-200'
        }
      }
  return (
    <div>
      <nav className="flex w-full mt-8 gap-8 justify-center">
        <Link to={'/account'} className={` ${checkActive('profile')}  py-2 px-6 rounded-full flex gap-1 `} >
          <AiOutlineUser className="w-6 h-6"/>
          My profile
        </Link>
        <Link to={'/account/bookings'} className={`${checkActive('bookings')} py-2 px-6 rounded-full flex gap-1 `  }>
          <BsListStars className="w-6 h-6"/>
          My bookings
        </Link>
        <Link to={'/account/accommodation'} className={`${checkActive('accommodation')} py-2 px-6 rounded-full flex gap-1`  }>
          <BiBuildingHouse className="w-6 h-6"/>
          My accommodation
        </Link>
      </nav>
    </div>
  )
}

export default AccountNavbar
