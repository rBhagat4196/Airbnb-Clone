import { Link, Navigate} from "react-router-dom"
import {AiOutlinePlusCircle} from "react-icons/ai"
import AccountNavbar from "../components/AccountNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {AiFillDelete} from "react-icons/ai"
import { useUserContext } from "../context/userContext";
const PlacesPage = () => {
  const {user} = useUserContext();
  const [redirectToLogin,setRedirectToLogin] = useState(true);
    const [placesDetails , setPlacesDetails] = useState([]);
    
    useEffect(()=>{
      if(!user){
        setRedirectToLogin(true);
      }
        axios.get('/places-details').then(({data})=>{
          setPlacesDetails(data);
        })
    },[user]);
    const deltePlaces = async(id)=>{
      await axios.delete('/delete-place/'+id);
      axios.get('/places-details').then(({data})=>{
        setPlacesDetails(data);
      })
    }
    if(redirectToLogin){
      return <Navigate to={'/login'} />
    }
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
      <div className=" mt-5 grid gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {placesDetails && placesDetails.length > 0 && placesDetails.map(place =>(
        <div key={place._id} className="relative">
          <div className="absolute top-10 right-5 cursor-pointer rounded-full p-1 bg-red-300 border-4">
            <AiFillDelete className="h-6 w-6" 
            onClick={()=>deltePlaces(place._id)}
            />
          </div>
          <Link to={'/account/accommodation/'+place._id} >
              <div className=" mt-4 w-[300px] h-[450px] rounded-2xl bg-red-200 border border-5 border-violet-400">
                <div>
                  <img className="w-[300px] h-[200px] object-cover rounded-xl p-2 object-fil" src={'http://localhost:4000/uploads/'+place.mainImage} alt="" />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{place.title}</h5>
                  <p className="h-[100px] mb-3 font-normal text-gray-700 overflow-hidden">{place.description}</p>
                  
                </div>
            </div>
      </Link>
        </div>
        )) 
      }
      </div>
    </div>
    </div>
  )
}

export default PlacesPage
