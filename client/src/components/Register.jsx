import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const registerUser = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('/register', {
            name,
            email,
            password,
          });
    
          // Handle the response, e.g., show a success message or redirect to another page.
          console.log('Registration successful', response.data);
        } catch (error) {
          // Handle errors, e.g., show an error message to the user.
          console.error('Registration failed', error);
        }
      };
   return (
    <div className="mt-4 grow flex items-center justify-around">
        <div>
        <h1 className="-mt-48 text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={registerUser}>
            <input type="text" placeholder="John Doe" value={name}  onChange={(e)=> setName(e.target.value)}/>
            <input type="text" placeholder="john@gmail.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button className="w-full p-2 rounded-2xl bg-gradient-to-l text-lg font-bold from-pink-500 via-violet-500 to-indigo-500 text-white border border-blue-400 text-center">Register</button>
        </form>
        <div className="my-2 text-center">
          <span className="text-gray-500">
            Already have an account ?
            </span>  
            <Link to={"/login"}>
                Login Now
            </Link>
        </div>
        </div>
    </div>
  )
}

export default Register
