import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
import { differenceInCalendarDays } from "date-fns/fp";
// import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { API } from "../../utils";
const BookingWidget = ({placeDetails}) => {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests,SetNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phoneNo,setPhoneNo] = useState("");
  const [redirect,setRedirect] = useState(false);
  const [redirectToLogin,setRedirectToLogin]=useState(false)
  const {user} = useUserContext();
  let bookingPrice = 0;
  let numberOfNights = 0;
  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  },[user])
  if(checkIn && checkOut){
    numberOfNights = differenceInCalendarDays(new Date(checkIn),new Date(checkOut));
  }
  if(numberOfNights > 0){
    bookingPrice=numberOfNights*placeDetails.price*numberOfGuests;
  }
  const bookThisPlace = async () => {
    if (!user) {
      setRedirectToLogin(true);
    } else {
      const data = {
        placeId: placeDetails._id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phoneNo,
        price: bookingPrice,
        owner: user._id,
      };
      API.post("/booking", data);
      setRedirect(true);
    }
  };

  if (redirectToLogin) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={'/account/bookings'} />;
  }
  return (
    <div className="">
      <div className="bg-white shadow p-4 rounded-2xl ">
        <div className="text-2xl text-center flex justify-center">
          Price: 
          <h2 className="font-bold">
          ${placeDetails.price}/per night
          </h2>
        </div>
        <div className="flex">
        <div className="my-2 border-2 py-2 px-2 rounded-xl">
          <label>Check in:</label>
          <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)}/>
        </div>
        <div className="my-2 border-2 py-2 px-2 rounded-xl">
          <label>Check out:</label>
          <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}/>
        </div>
        </div>
        <div className="py-2 px-2">
          <label>Number of guests</label>
          <input type="number" value={numberOfGuests}  onChange={(e)=>SetNumberOfGuests(e.target.value)}/>
        </div>
        {numberOfNights > 0 && (
          <div>
            <label >Your Full Name:</label>
            <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
            <label>Mobile Number:</label>
            <input type="text" value={phoneNo}  onChange={(e)=>setPhoneNo(e.target.value)}/>
          </div>
        )}
        <button className="border-2 bg-red-500 rounded-full p-2 w-full " disabled={!checkIn && !checkOut && !name && !phoneNo} onClick={bookThisPlace}>Book This Place</button>
        {numberOfNights > 0 && (
          <span>${bookingPrice}</span>
        )}
      </div>
    </div>
  )
}

export default BookingWidget
