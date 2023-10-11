import express from 'express';
import cors from 'cors';
import connectDb from './config/connectDb.js';
import dotenv from "dotenv"
import User from "./models/userModel.js"
import bcrypt from 'bcrypt'
dotenv.config();
const app = express();
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173',
};

app.use(express.json())
app.use(cors(corsOptions));

connectDb(process.env.MONGO_URL);
const salt = await bcrypt.genSalt();
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
                res.json('ok')
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
})


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});