import { Link } from "react-router-dom"

export const Error404 = () => {
   return (
      <>
         <div className="w-full h-screen bg-black flex justify-center items-center flex-col gap-10">
            <h1 className="uppercase text-white font-bold text-8xl">NOT FOUND</h1>
            <Link to='/' className="bg-white text-black font-bold p-5">Back to home page</Link>
         </div>   
      </>
   )
}