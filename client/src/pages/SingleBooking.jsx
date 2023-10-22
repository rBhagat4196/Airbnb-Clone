import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import PlaceGallery from "../components/PlaceGallery";
import { format } from "date-fns";
import Loader from "../components/Loader";
const SingleBooking = () => {
  const {user,loaded} = useUserContext();
  const [redirectToLogin,setRedirectToLogin] = useState(false);
  const [booking,setBooking] = useState('');
  const {id} = useParams();
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
    if(!user && loaded) setRedirectToLogin(true)
    else{
     axios.get('/booking-details/'+id).then(response =>{
       setBooking(response.data)
       setLoading(false)
      } 
     );
  }


  },[id, loaded, user])
  if(redirectToLogin){
    return <Navigate to={'/login'}/>
  }
if(booking){
  console.log(booking)
}
  return (loading ? <Loader/> : (
    <div className="flex justify-center">
    <div className="lg:w-4/6 flex justify-center">
      {booking && (
       <div className="my-8 flex flex-col">
       <h1 className="text-3xl">{booking.placeId.title}</h1>
       <a className="mb-4 font-semibold flex gap-1 " href={'https://www.google.com/maps/search/?q='+booking.placeId.address} target="_blank" rel="noreferrer">
       <GrLocation className="w-6 h-6 p-1"/>
        {booking.placeId.address}
        </a>
       <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
         <div>
           <h2 className="text-2xl mb-4">Your booking information:</h2>
           <div className="text-2xl font-bold font-serif">
                  {format(new Date(booking.checkIn),'yyyy-MM-dd')}  
                  <span> -- </span>
                    {format(new Date(booking.checkOut),'yyyy-MM-dd')}
                </div>
         </div>
         <div className="bg-gray-400 p-6 text-white rounded-2xl">
           <div>Total price</div>
           <div className="text-3xl">${booking.price}</div>
         </div>
       </div>
       <PlaceGallery placeDetails={booking.placeId} />
     </div>
      )}
    </div>
    </div>
  )
  )
}

export default SingleBooking
