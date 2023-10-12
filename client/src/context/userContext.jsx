import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { Navigate } from "react-router-dom";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        if(!user){
          const userData = await axios.get('/profile');
          console.log(userData.data);
          setUser(userData);
        }
        if(!user){
          return <Navigate to={'/login'}/>
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
    }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useUserContext = () => useContext(UserContext);