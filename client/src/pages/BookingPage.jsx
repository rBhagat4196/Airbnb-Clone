/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import AccountNavbar from "../components/AccountNavbar"
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Image from "../components/Image";
import {AiFillDelete} from "react-icons/ai"
import { differenceInCalendarDays, format} from "date-fns";
import { useUserContext } from "../context/userContext";
const BookingPage = () => {
  const {user,loaded} = useUserContext();
  const [bookings,setBookings] = useState([]);
  const [redirect,setRedirect] = useState(false)
  useEffect(()=>{
    if(!user && loaded){
      setRedirect(true);
    }
    else{
      axios.get('/bookings-detail').then(response=>{
        setBookings(response.data);
      })
    }
  },[loaded, user]);
  
  const deleteBooking = async(id)=>{
    await axios.delete('/delete-booking/'+id);
    axios.get('/bookings-detail').then(({data})=>{
        setBookings(data);
      })
  }
  if(redirect){
    return <Navigate to={'/login'}/>
  } 
  return (
    <div>
      <AccountNavbar />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <div key={booking._id} className="flex justify-center">
          <div className="flex flex-col m-5 w-4/5 lg:w-1/2">
          <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden items-center">
            <div className="w-48">
            <Image className="rounded-2xl object-cover aspect-square" src={booking.placeId.photos?.[0]} alt=""/>
            </div>
            <Link to={`/account/bookings/${booking._id}`}  className="py-3 pr-4 grow">
              <h2 className="text-xl px-2 font-bold">{booking.placeId.title}</h2>
              <div className="text-xl">
                <div className="px-4">
                  {format(new Date(booking.checkIn),'yyyy-MM-dd')}  
                  <span> -- </span>
                    {format(new Date(booking.checkOut),'yyyy-MM-dd')}
                </div>
                <div className="px-2">
                  <div className="flex gap-2">
                    <div className="flex gap-4 border-r-2 border-gray-400 p-2">
                      <img src="/guest-svgrepo-com.svg" className="h-8 w-8 p-1 rounded-full bg-white"/>
                        {booking.numberOfGuests}
                        
                    </div>
                    <div className="flex gap-2 p-2">
                    <img src="/night-svgrepo-com.svg" className="h-8 w-8 p-1 rounded-full bg-gray-600" />
                      {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))}
                    </div>
                  </div>
                  <div className="flex px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span>
                    Total price: ${booking.price}
                  </span>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-center cursor-pointer h-8 w-8  mr-5 bg-white rounded-full p-1" onClick={()=>deleteBooking(booking._id)}>
              <AiFillDelete/>
            </div>
          </div>
        </div>
        </div>
        ))}
        {
          bookings.length == 0 && (
            <div className="flex flex-col gap-4 items-center justify-center h-[400px]">
              <img src="/cassette_3793546.png" className="h-40 w-40"/>
              <h1 className="text-3xl font-bold text-gray-600 p-2">
                No Booking Yet 
              </h1>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default BookingPage
