import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [ready,setReady] = useState(false)
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        if(!user){
          const {data} = await axios.get('/profile');
          setUser(data);
          setReady(true)
          if(!data){
            navigate('/login')
          }
        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      ready,
      setReady
    }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired     // to fix some warning sujjested at web
};

export const useUserContext = () => useContext(UserContext);