import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext"
import { Navigate } from "react-router-dom";

const SingleBooking = () => {
  const {user,loaded} = useUserContext();
  const [redirectToLogin,setRedirectToLogin] = useState(false);
  useEffect(()=>{
    if(!user && loaded) setRedirectToLogin(true)
    else{
     console.log("Single Page Booking View")
  }

  },[loaded, user])
  if(redirectToLogin){
    return <Navigate to={'/login'}/>
  }
  return (
    <div>
      Single Booking Page
    </div>
  )
}

export default SingleBooking
