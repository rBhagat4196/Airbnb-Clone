import express from 'express';
import cors from 'cors';
import connectDb from './config/connectDb.js';
import dotenv from "dotenv"
import User from "./models/userModel.js"
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import Jwt  from 'jsonwebtoken';

// initializers
dotenv.config();
const app = express();


// options
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173',
};
const salt = await bcrypt.genSalt();


// middlewares
app.use(express.json())
app.use(cors(corsOptions));
app.use(cookieParser())


// Database connection
connectDb(process.env.MONGO_URL);


// endpoints or request
app.post('/register',async(req,res)=>{
    try{

        const {name,email,password} = req.body;
        
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({name,email,password : hashedPassword});
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

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});