import { Link,useParams } from "react-router-dom"
import {AiOutlinePlusCircle} from "react-icons/ai"
import AccountNavbar from "../components/AccountNavbar";
const PlacesPage = () => {
    const {action}= useParams();
  return (
    <div className="">
      <AccountNavbar/>
        {action != 'new' && (
      <div className="text-center mt-4">
        <Link to={'/account/accommodation/new'} className="inline-flex gap-2 bg-red-400 py-2 px-6 rounded-full text-white">
            <AiOutlinePlusCircle className="relative w-6 h-6"/>
            Add New Places
        </Link>
      </div>
        )}
    </div>
  )
}

export default PlacesPage
