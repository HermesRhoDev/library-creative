import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../components/Logout";
import { UserContext } from "../../context/authContext";

export const Dashboard = () => {
   const { currentUser } = useContext(UserContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (!currentUser) {
         navigate('/')
      }
    }, [currentUser]);

   return (
      <>
        {currentUser ? (
            <div className="w-full h-full flex flex-row">
               <div className="bg-black h-full w-1/5 p-5 flex flex-col">
                  <h1 className="text-white text-center font-bold uppercase flex flex-row justify-evenly items-center">
                     <span className="rounded-full bg-white w-5 h-2 block"></span>
                     My Library
                     <span className="rounded-full bg-white w-5 h-2 block"></span>
                  </h1>
                  <nav className="flex flex-col items-center mt-auto">
                     <li><Logout /></li>
                  </nav>
               </div>
               <div className="bg-blue-400 w-4/5 h-full overflow-y-auto"></div>
            </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-20 justify-center items-center bg-black">
            <h1 className="text-white font-bold uppercase text-5xl">! vous devez être connecté !</h1>
            <Link className="text-black bg-white p-5 w-44 font-bold text-center uppercase" to='/signin'>Se Connecter</Link>
          </div>
        )}
      </>
   );
}