import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const AuthContextProvider = ({ children }) => {
   const [token, setToken] = useState(
      JSON.parse(localStorage.getItem("token")) || false
    );
    const [currentUser, setCurrentUser] = useState(null);
  
    const updateToken = (updatedToken) => {
      setToken(updatedToken);
      localStorage.setItem("token", JSON.stringify(updatedToken));
    };
  
    useEffect(() => {
      if (token != false) {
         setCurrentUser(true);
      }
  
      if (!token) {
        setCurrentUser(false);
      }
    }, [token]);
  
    return (
      <UserContext.Provider value={{ token, updateToken, currentUser }}>
        {children}
      </UserContext.Provider>
    );
};
 
export default AuthContextProvider;