import axios from "axios";
import { useUserContext } from "../context/userContext"
import {  Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountNavbar from "../components/AccountNavbar";

const Account = () => {
  const {user,loaded} = useUserContext();
  const [redirect,SetRedirect] = useState(false);
  const {setUser} = useUserContext();
  let {subpage} = useParams();
  useEffect(()=>{
    if(!user && loaded){
      SetRedirect(true)
    }
  },[loaded, user]);
  
  if(subpage == undefined){
    subpage = 'profile'
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
      <AccountNavbar/>
      {loaded && user && subpage == 'profile' && (
        <div className="mt-4 text-center max-w-lg mx-auto">
          <div className="bg-white rounded-lg p-8  w-80 mx-auto">
          <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
            <img src="/avatar-1577909_1280.webp" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          </div>
          <div>
            Logged in as {user.name} ({user.email}) 
          </div>
          <div>
            <button className="mt-2 w-full p-2 rounded-2xl bg-red-400 text-white border border-blue-400 text-center" onClick={logOut}>
              Logout
             </button>
          </div>
    </div>
      )}
      </div>
  )
}

export default Account;
