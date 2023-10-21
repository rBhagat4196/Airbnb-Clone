/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loaded,setLoaded] = useState(false)
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        if(!user){
          const {data} = await axios.get('/profile');
          if(data != null){
            const {name,email,_id} = data;
            setUser({name,email,_id});
          }
          setLoaded(true);
          
        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[navigate, user]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      loaded,
      setLoaded
    }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired     // to fix some warning sujjested at web
};

export const useUserContext = () => useContext(UserContext);