import express from 'express';
import cors from 'cors';
import connectDb from './config/connectDb.js';
import dotenv from "dotenv"
import User from "./models/userModel.js"
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import Jwt  from 'jsonwebtoken';
import imageDownloader from 'image-downloader';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import multer from 'multer';
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import Places from './models/placeModel.js';
import Bookings from './models/bookingModel.js';


// initializers
dotenv.config();
const app = express();
const salt = await bcrypt.genSalt();


// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads/'));


// Database connection
connectDb(process.env.MONGO_URL);


// endpoints or request
app.get('/test',(req,res)=>{
  res.send("connected")
})
app.post('/register',async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,salt);
        const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
        const newUser = new User({name:capitalizeName,email,password : hashedPassword});
        await newUser.save();
        res.json("Registration Successful")
    }
    catch(error){
        res.status(422).json(error);
    }
});

app.post('/login',async(req,res)=>{
    try{
        const { email, password } = req.body;
        const data = await User.findOne({ email });
        if(data){

            const isOk = bcrypt.compareSync(password,data.password);
            if(isOk){
                const cookieOptions = {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                    httpOnly: true,
                  };
                Jwt.sign({email:data.email , id : data._id},process.env.SECRET_TOKEN,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token,cookieOptions).json(data);
                });
            }
            else{
                res.status(422).json('Password Incorrect');
            }
        }
        else{
            res.status(422).json('No User Found');
        }
    }
    catch(error){
        res.status(422).json(error);
    }
});
app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if (token) {
        Jwt.verify(token, process.env.SECRET_TOKEN, {}, async (err, userData) => {
          if (err) throw err;
          const {name,email,_id} = await User.findById(userData.id);
        //   console.log(userData)
          res.json({name,email,_id});
        });
      } else {
        res.json(null);
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post("/upload-by-link",async(req,res)=>{
    const { link } = req.body;

    if (!link) {
      return res.status(400).json('The "link" parameter is required.');
    }
  
    const newName = 'photo'+Date.now() + '.jpg';
    const uploadPath = __dirname+'/uploads/'+newName;

    try {
      await imageDownloader.image({
        url: link,
        dest: uploadPath,
      });
      res.json(newName);
    } catch (error) {
      console.error('Error downloading image:', error);
      res.status(500).json('An error occurred while downloading the image.');
    }
});

const multerMiddlewares = multer({dest:'uploads/'});

app.post('/upload',multerMiddlewares.array('photos',20),(req,res)=>{
  const uploadedFiles = [];
  for(let i=0;i<req.files.length;i++){
    const {path,originalname,filename}=req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    const newFileName= filename+'.'+ext;
    fs.renameSync(path,newPath);
    uploadedFiles.push(newFileName);
  }
  res.json(uploadedFiles)
})


app.post('/places',async(req,res)=>{
  const {title,address,addedPhotos , sanitzedText,
  perks,sanitzedExtra,checkIn,checkOut,maxGuests,mainImage,price} = req.body
  const {token} = req.cookies;
  // console.log(token)
    if (token) {
        Jwt.verify(token, process.env.SECRET_TOKEN, {}, async (err, userData) => {
          if (err) throw err;
          const newPlace = new Places({
            owner : userData.id,
            title,
            address,
            photos : addedPhotos , 
            description:sanitzedText,
            perks,
            extraInfo:sanitzedExtra,
            checkIn,
            checkOut,
            maxGuests,
            mainImage,
            price,
          });
          res.json(newPlace);
          newPlace.save();
        });
      } else {
        res.json(null);
    }
});

app.put('/places',async(req,res)=>{
  const {title,address,addedPhotos , sanitzedText,
    perks,sanitzedExtra,checkIn,checkOut,maxGuests,mainImage,price,id} = req.body
    const {token} = req.cookies;
    // console.log(token)
    if (token) {
      Jwt.verify(token, process.env.SECRET_TOKEN, {}, async (err, userData) => {
            const placesDoc = await Places.findById(id);
            if(placesDoc.owner == userData.id ){
            placesDoc.set({
            title,
            address,
            photos : addedPhotos , 
            description:sanitzedText,
            perks,
            extraInfo:sanitzedExtra,
            checkIn,
            checkOut,
            maxGuests,
            mainImage,
            price,
              });
              await placesDoc.save();
              res.json("successfully updated places doc")
            }
          });
        } else {
          res.json(null);
      }
})

app.get('/places-details',(req,res)=>{
  const {token} = req.cookies;
  if (token) {
      Jwt.verify(token, process.env.SECRET_TOKEN, {}, async (err, userData) => {
        if (err) throw err;
        res.json(await Places.find({owner : userData.id}))
      });
    } else {
      res.json(null);
  }
})

app.get('/places-details/:id',async(req,res)=>{
  const {id} = req.params;
  res.json(await Places.findById(id));
  
});
 
app.delete('/delete-place/:id',async(req,res)=>{
  const {id} = req.params;
  await Places.findByIdAndDelete(id);
  res.json("successfully delted");
});


app.get('/places-all',async(req,res)=>{
  res.json(await Places.find());
})


app.post('/booking',async (req,res)=>{
  const {placeId,checkIn,checkOut,numberOfGuests,name,phoneNo,price,owner} = req.body;
  const newBooking  = new Bookings({
    placeId,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phoneNo,
    price,
    user:owner,
  });
  await newBooking.save();
  // console.log(newBooking);
  res.json(newBooking)
});

function getUserDataFromToken(token){
  return new Promise((resolve,reject)=>{
    Jwt.verify(token, process.env.SECRET_TOKEN, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData)
    });
  })
}
app.get('/bookings-detail',async(req,res)=>{
  const userData = await getUserDataFromToken(req.cookies.token);
  res.json(await Bookings.find({user : userData.id}).populate('placeId'))
  // res.json(Bookings.find({user:userData.id}));
})

app.get('/booking-details/:id',async(req,res)=>{
  const {id} = req.params;
  // console.log(id)
  res.json(await Bookings.findById(id).populate('placeId'))
  // res.json(Bookings.find({user:userData.id}));
})

app.delete('/delete-booking/:id',async(req,res)=>{
  const {id} = req.params;
  await Bookings.findByIdAndDelete(id);
});

app.get('/place/:query',async(req,res)=>{
  const {query} = req.params;
  // console.log(query)
  try {
      const results = await Places.find({
        $or: [
          { 
            title: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search for "query" in "title"
            {  address: { $regex: new RegExp(query, 'i') } } // Case-insensitive search for "query" in "address"
          ]
        });
        res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
})
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});