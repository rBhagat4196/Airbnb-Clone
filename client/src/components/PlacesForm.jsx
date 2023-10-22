import { Navigate, useParams} from "react-router-dom"
import {BsUpload} from "react-icons/bs"
import Perks from "./Perks"
import { useEffect, useState } from "react"
import axios from "axios";
import {AiOutlineStar} from "react-icons/ai"
import { useUserContext } from "../context/userContext";
import Loader from "./Loader";
const PlacesForm = () => {
    const [loading,setLoading] = useState(false);
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [mainImage,setMainImage] = useState('');
    const [price,setPrice] = useState(200);
    const [redirect,setRedirect] = useState(false);
    const [photoLink,setPhotoLink] = useState('');
    const {user,loaded} = useUserContext();
    const [redirectToLogin,setRedirectToLogin] = useState(false);
    const addPhotoByLink=async(e)=>{
      e.preventDefault();
      const {data:filename}=await axios.post('/upload-by-link',{link : photoLink})
      setAddedPhotos((prev) =>{
          return [...prev,filename];
      })
      setPhotoLink('');
    }
    const uploadFromDevice = (e)=>{
      const files = e.target.files;
      const data = new FormData();
      for(let i=0;i<files.length ;i++){
          data.append('photos',files[i])
      }
      axios.post('/upload',data,{
          headers:{'Content-Type':'multipart/form-data'}
      }).then(response =>{
          const {data : filenames} =response;
          console.log(addedPhotos);
          setAddedPhotos((prev) =>{
              return [...prev, ...filenames];
          })
      })
    }

  
    const savePlace = async(e)=>{
      e.preventDefault();
      setLoading(true);
      if(id){
        let sanitzedExtra='';
        let sanitzedText='';
        if(description)
            sanitzedText=description.split('\n').map(para => para.trim()).join('\n');
        if(extraInfo)
            sanitzedExtra = extraInfo.split('\n').map(para => para.trim()).join('\n')
        axios.put('/places',{
            title,
            address,
            addedPhotos,
            sanitzedText,
            perks,
            sanitzedExtra,
            checkIn,
            checkOut,
            maxGuests,
            mainImage,
            price,
            id,    //   id for updata 
        })
        setRedirect(true)
        setLoading(false)
      }
      else{
        // let mainImage = ''
        let sanitzedExtra='';
        let sanitzedText='';
        if(description)
            sanitzedText=description.split('\n').map(para => para.trim()).join('\n');
        if(extraInfo)
            sanitzedExtra = extraInfo.split('\n').map(para => para.trim()).join('\n')
          await axios.post('/places',{
              title,
              address,
              addedPhotos,
              sanitzedText,
              perks,
              sanitzedExtra,
              checkIn,
              checkOut,
              maxGuests,
              mainImage,
              price,
            })
            setRedirect(true);
            setLoading(false)
        }
    }
    useEffect(()=>{
        setLoading(true)
        if(!user && loaded){
            setRedirectToLogin(true);
        }

        if(!id){
            setLoading(false)
            return;
        } 
        else{
            setLoading(true)
            axios.get('/places-details/'+id).then(response =>{
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setDescription(data.description);
                setAddedPhotos(data.photos);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setMainImage(data.mainImage);
                setPrice(data.price);
                setLoading(false);
                setLoading(false);
            });
        }
    },[id, loaded, user])
    if(redirect){
      return <Navigate to={'/account/accommodation'}/>
    }
    if(redirectToLogin){
        return <Navigate to={'/login'}/>
    }
    if(mainImage == '' && addedPhotos.length > 0) setMainImage(addedPhotos[0])
    // console.log(addedPhotos)
  return (loading ? <Loader/> : (

      <div>
      <form onSubmit={savePlace}>
            <h1 className="text-2xl mt-4">
                Title
            </h1>
            <p className="text-gray-400">
                title for your places , like advertisement
            </p>
            <input name="title" type="text" placeholder="title , e.g My Farm House" value={title} onChange={e => setTitle(e.target.value)}/>
            <h1 className="text-2xl mt-4">
                Address
            </h1>
            <p className="text-gray-400">
                Address of this place
            </p>
            <input name="Address" type="text" placeholder="Address" autoComplete = "true" value={address} onChange={e => setAddress(e.target.value)}/>
            <h1 className="text-2xl mt-4">
                Photos
            </h1>
            <p className="text-gray-400">
                add some photos
            </p>
            <div className="flex gap-2">
                <input name="upload" type="text" placeholder="Add using link ...jpg/img/png" value={photoLink} onChange={e => setPhotoLink(e.target.value)}/>
                <button onClick={addPhotoByLink} className="px-4 bg-gray-400 rounded-3xl" >Add&nbsp;photos</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {addedPhotos && addedPhotos.length > 0 &&  (
                    addedPhotos.map((url)=>(
                        <div key={url} className="relative h-32 flex gap-2">
                            <div className="absolute  border-4  w-full h-full ">
                            <AiOutlineStar className={`mx-auto my-[80px] h-6 w-6 bg-gray-200 rounded-full  cursor-pointer  ${mainImage == url ? 'opacity-100':'opacity-25'}`}  onClick={()=>setMainImage(url)}/>
                            </div>
                            <img src={'http://localhost:4000/uploads/'+url} className="rounded-2xl w-full object-cover"></img>
                        </div>
                    ))
                )}
                <label className="border gap-1 cursor-pointer border-gray-500 p-8 rounded-2xl flex items-center">
                    <input name="uploadD" type="file" multiple className="hidden" onChange={uploadFromDevice}/>
                    <BsUpload className="grow min-h-8 min-w-8"/>
                    <div className="hidden xl:flex ">Upload</div>
                </label>
            </div>
            <h1 className="text-2xl mt-4">
                Description
            </h1>
            <p className="text-gray-400">
                add description to the place
            </p>
            <textarea name="description" id="" cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <h1 className="text-2xl mt-4">
                Perks
            </h1>
            <p className="text-gray-400">
                Select the provided perks
            </p>
            <Perks selected={perks} onChange={setPerks}/>
            <div>
            <h1 className="text-2xl mt-4">
                Extra Info
            </h1>
            <p className="text-gray-400">
                Add House Rules
            </p>
            <textarea name ="extraInfos" value={extraInfo} onChange={e => setExtraInfo(e.target.value)}/>
            </div>
            <h1 className="text-2xl mt-4">
                Check in&out times
            </h1>
            <p className="text-gray-400">
                add check in and check out time
            </p>
            <div className="grid grid-cols-2 gap-1 lg:grid-cols-4">
                <div>
                    <h3>Check In</h3>
                    <input name="checkin" type="text" placeholder="10:00" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                </div>
                <div>
                    <h3>Check Out</h3>
                    <input name="checkout" type="text" placeholder="2:00" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                </div>
                <div>
                    <h3>Max number of guests</h3>
                    <input name="maxguests" type="text" placeholder="4" value={maxGuests} onChange={e => setMaxGuests(e.target.value)}/>
                </div>
                <div>
                    <h3>Price/Night</h3>
                    <input name="price" type="text" placeholder="4" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
            </div>
            
            <button className="w-full p-1 mt-2 rounded-xl text-white font-bold text-center bg-red-400">Save</button>
        </form>
    </div>
  )
  )
}

export default PlacesForm
