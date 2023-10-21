import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext"
import { Navigate } from "react-router-dom";

const SingleBooking = () => {
  const {user} = useUserContext();
  const [redirectToLogin,setRedirectToLogin] = useState(true);
  useEffect(()=>{
    if(!user) setRedirectToLogin(true)

  },[])
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
