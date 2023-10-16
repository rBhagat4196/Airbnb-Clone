import { Link } from "react-router-dom"
import {AiOutlinePlusCircle} from "react-icons/ai"
import AccountNavbar from "../components/AccountNavbar";
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {
    const [placesDetails , setPlacesDetails] = useState([]);
    useEffect(()=>{
        axios.get('/places-details').then(({data})=>{
          setPlacesDetails(data);
        })
    },[]);
  return (
    <div className="">
      <AccountNavbar/>
      <div className="text-center mt-4">
        <Link to={'/account/accommodation/new'} className="inline-flex gap-2 bg-red-400 py-2 px-6 rounded-full text-white">
            <AiOutlinePlusCircle className="relative w-6 h-6"/>
            Add New Places
        </Link>
      </div>
      <div className="flex justify-center">
      <div className="mt-5 grid gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {placesDetails && placesDetails.length > 0 && placesDetails.map(place =>(
          <>
              <div className=" mt-4 max-w-[300px] rounded-2xl bg-red-200 border border-5 border-violet-400">
                <div>
                  <img className="w-[300px] h-[200px] object-cover rounded-xl p-2 object-fil" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{place.title}</h5>
                  <p className="h-[100px] mb-3 font-normal text-gray-700 overflow-hidden">{place.description}</p>
                  <a href={'/account/accommodation/'+place._id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
                </div>
            </div>
      </>
        )) 
      }
      </div>
    </div>
    </div>
  )
}

export default PlacesPage
