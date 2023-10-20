import { useEffect, useState } from "react"
import AccountNavbar from "../components/AccountNavbar"
import axios from "axios";

const BookingPage = () => {
  const [bookings,setBookings] = useState();
  useEffect(()=>{
    axios.get('/booking-details').then(response=>{
      setBookings(response.data);
    })
  })
  return (
    <div>
      <AccountNavbar/>
      Booking page
      {bookings && bookings.map(book=>(
        <div key={book._id}>
          book.name
        </div>
      ))}
    </div>
  )
}

export default BookingPage
