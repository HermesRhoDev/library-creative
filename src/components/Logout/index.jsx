import React, { useContext } from "react";
import { UserContext } from "../../context/authContext";

export const Logout = () => {
  const { updateToken } = useContext(UserContext);

  const handleLogout = () => {
    updateToken(false);
    console.clear();
    localStorage.clear();
  };

  return <button onClick={handleLogout} className="text-black uppercase font-bold px-5 py-2 bg-white">Déconnexion</button>;
};