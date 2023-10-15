import { Navigate} from "react-router-dom"
import {BsUpload} from "react-icons/bs"
import Perks from "./Perks"
import { useState } from "react"
import axios from "axios";
const PlacesForm = () => {
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
  //   const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);
    const [photoLink,setPhotoLink] = useState('');
  
    const addPhotoByLink=async(e)=>{
      e.preventDefault();
      const {data:filename}=await axios.post('/upload-by-link',{link : photoLink})
      setAddedPhotos(prev =>{
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
          console.log(data);
          const {data : filenames} =response;
          setAddedPhotos(prev =>{
              return [...prev , ...filenames];
          })
      }) 
    }
  
    const addNewPlace = async(e)=>{
      e.preventDefault();
      await axios.post('/places',{
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests
      })
      setRedirect(true)
    }
  
    if(redirect){
      return <Navigate to={'/account/accommodation'}/>
    }
  return (
    <div>
      <form onSubmit={addNewPlace}>
            <h1 className="text-2xl mt-4">
                Title
            </h1>
            <p className="text-gray-400">
                title for your places , like advertisement
            </p>
            <input type="text" placeholder="title , e.g My Farm House" value={title} onChange={e => setTitle(e.target.value)}/>
            <h1 className="text-2xl mt-4">
                Address
            </h1>
            <p className="text-gray-400">
                Address of this place
            </p>
            <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}/>
            <h1 className="text-2xl mt-4">
                Photos
            </h1>
            <p className="text-gray-400">
                add some photos
            </p>
            <div className="flex gap-2">
                <input type="text" placeholder="Add using link ...jpg/img/png" value={photoLink} onChange={e => setPhotoLink(e.target.value)}/>
                <button onClick={addPhotoByLink} className="px-4 bg-gray-400 rounded-3xl" >Add&nbsp;photos</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {addedPhotos.length > 0 && (
                    addedPhotos.map(url=>(
                        <div key={url} className="h-32 flex gap-2">
                            <img src={'http://localhost:4000/uploads/'+url} className="rounded-2xl w-full object-cover"></img>
                        </div>
                    ))
                )}
                <label className="border gap-1 cursor-pointer border-gray-500 p-8 rounded-2xl flex items-center">
                    <input type="file" multiple className="hidden" onChange={uploadFromDevice}/>
                    <BsUpload className="w-6 h-6"/>
                    <div className="font-bold">Upload</div>
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
            <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}/>
            </div>
            <h1 className="text-2xl mt-4">
                Check in&out times
            </h1>
            <p className="text-gray-400">
                add check in and check out time
            </p>
            <div className="grid grid-cols-3 gap-1">
                <div>
                    <h3>Check In</h3>
                    <input type="text" placeholder="10:00" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                </div>
                <div>
                    <h3>Check Out</h3>
                    <input type="text" placeholder="2:00" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                </div>
                <div>
                    <h3>Max number of guests</h3>
                    <input type="text" placeholder="4" value={maxGuests} onChange={e => setMaxGuests(e.target.value)}/>
                </div>
            </div>
            
            <button className="w-full p-1 mt-2 rounded-xl text-white font-bold text-center bg-red-400">Save</button>
        </form>
    </div>
  )
}

export default PlacesForm
