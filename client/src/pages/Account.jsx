import axios from "axios";
import { useUserContext } from "../context/userContext"
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
const Account = () => {
  const {user,ready} = useUserContext();
  const [redirect,SetRedirect] = useState(false);
  const {setUser} = useUserContext();
  let {subpage} = useParams();
  if(!ready){
    return 'Loading';
  }
  if(subpage == undefined){
    subpage = 'profile'
  }
  const checkActive = (tab)=>{
    if(tab == subpage){
      return 'bg-red-400'
    }
  }
  const logOut = async()=>{
    try{
      await axios.post('/logout');
      SetRedirect(true);
      setUser(null)
    }
    catch(err){
      console.log(err);
    }
  }
  if(redirect){
    return <Navigate to={'/login'}/>
  }
  return (
    <div>
      <nav className="flex w-full mt-8 gap-8 justify-center">
        <Link to={'/account'} className={`${checkActive('profile')} py-2 px-6 rounded-full`} >
          My profile
        </Link>
        <Link to={'/account/bookings'} className={`${checkActive('bookings')} py-2 px-6 rounded-full`  }>
          My bookings
        </Link>
        <Link to={'/account/accommodation'} className={`${checkActive('accommodation')} py-2 px-6 rounded-full`  }>
          My accommodation
        </Link>
      </nav>
      {subpage == 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Loggeg in as {user.name} ({user.email}) 
          <br/>
            <button className="mt-2 w-full p-2 rounded-2xl bg-red-400 text-white border border-blue-400 text-center" onClick={logOut}>
              Logout
              </button>
          </div>
      )}
    </div>
  )
}

export default Account;