import axios from "axios";
import { useUserContext } from "../context/userContext"
import {  Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import AccountNavbar from "../components/AccountNavbar";

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
      {subpage == 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) 
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
