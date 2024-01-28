
import { useState } from "react"
import { Link, Navigate} from "react-router-dom"
import { useUserContext } from "../context/userContext";
import Loader from "../components/Loader";
import { API } from "../../utils";
const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]= useState(false);
  const [loading,setLoading] = useState(false);
  const {setUser} = useUserContext();
  const loginUser = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
     const {data} =  await API.post('/login',{
        email,
        password
      });
      setUser(data);
      setLoading(false);
      setRedirect(true);
    }
    catch(error){
      setLoading(false)
      alert("Login Failed");
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return ( loading ? <Loader/> : (
    <div className="mt-4 grow flex items-center justify-around">
        <div>
        <h1 className="-mt-48 text-4xl text-center">Login</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={loginUser}>
            <input type="text" placeholder="john@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button className="w-full p-2 rounded-2xl bg-gradient-to-l text-lg font-bold from-pink-500 via-violet-500 to-indigo-500 text-white border border-blue-400 text-center">Login</button>
        </form>
        <div className="my-2 text-center">
          <span className="text-gray-500">
            Dont have an account yet ?
            </span>  
            <Link to={"/register"}>
                Register Now
            </Link>
        </div>
        </div>
    </div>
    )
  )
}
export default Login