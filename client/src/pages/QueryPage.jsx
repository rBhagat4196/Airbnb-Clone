import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import Loader from "../components/Loader";

const QueryPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const {query} = useParams();
  console.log(query)
  useEffect(() => {
    setLoading(true);
    axios.get("/place/"+query).then((response) => {
        setPlaces(response.data);
        setLoading(false);
      });
  }, [query]);
  return (
    <>
    {loading ? (<Loader/>) : (
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {!loading && places.length > 0 && places.map(place => (
      <div key={place._id}>

      <Link to={'/place/'+place._id}>
        <div className="bg-gray-500 mb-2 rounded-2xl flex">
          {place.photos?.[0] && (
            <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
            )}
        </div>
        <h2 className="font-bold">{place.address}</h2>
        <h3 className="text-sm text-gray-500">{place.title}</h3>
        <div className="mt-1">
          <span className="font-bold">${place.price}</span> per night
        </div>
      </Link>
        </div>
    ))}
      </div>
    ) }
    {
      !loading && places.length == 0 && (
        <div className="flex flex-col justify-center items-center h-[500px]">
          <div>
            <img src="/no-data-7712.png" className="h-[200px] w-[200px] "/>
          </div>
          <h1 className="text-3xl font-mono">No Data Found</h1>
        </div>
      )
    }
    </>

  );
};

export default QueryPage;
