import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import PlaceGallery from "../components/PlaceGallery";
import BookingWidget from "../components/BookingWidget";
import PlacePerks from "../components/PlacePerks";
import {GrLocation} from "react-icons/gr"
const Place = () => {
    const {id} = useParams();
    const [placeDetails,setPlaceDetails] = useState([]);
    useEffect(()=>{
      try{
        axios.get('/places-details/'+id).then(response=>{
            setPlaceDetails(response.data)
        })
      }
      catch(err){
        console.log(err);
        return <Navigate to={'/login'}/>
      }
    },[id])
    if(!placeDetails) return 'Loading..'
  return (
    <div className="flex justify-center ">

    <div className=" rounded-2xl flex justify-center flex-col lg:w-4/6 mt-4 bg-gray-100 p-2 border-red-400">
      <h1 className="font-bold text-3xl">{placeDetails.title}</h1>
      <a className="mb-4 font-semibold flex gap-1 " href={'https://www.google.com/maps/search/?q='+placeDetails.address} target="_blank" rel="noreferrer">
      <GrLocation className="w-6 h-6 p-1"/>
        {placeDetails.address}
        </a>
      <PlaceGallery placeDetails={placeDetails} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div>  
            <h2 className="font-bold text-2xl mt-2 font-mono">Description</h2>
            {placeDetails.description && placeDetails.description.split('\n').map((para, index) => (
    <p key={index} className=" text-gray-800 font-mono">{para}</p>
  ))}
            </div>
        
          Check-in: {placeDetails.checkIn}<br />
          Check-out: {placeDetails.checkOut}<br />
          Max number of guests: {placeDetails.maxGuests}
          </div>
        <div>  
          <BookingWidget placeDetails={placeDetails} />
        </div>
      </div>
      <div className="flex gap-10 p-4">
          <div className="w-1/2 bg-gray-200 rounded-2xl">
            <PlacePerks placeDetails={placeDetails}/> 
          </div>
          <div className="bg-gray-200 -mx-8 px-8 py-8 border-t w-1/2 rounded-2xl p-2">
            <div>
              <h2 className="font-semibold text-2xl text-gray-800">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {placeDetails.extraInfo && placeDetails.extraInfo.split('\n').map((para, index) => (
                  <p key={index} className="font-mono text-gray-800">
                    {para}
                  </p>
              ))}
          </div>
      </div>
        
    </div>
    </div>
    </div>
  )
}

export default Place
