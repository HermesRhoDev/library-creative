import { useState } from "react";

export const Library = () => {
   let [currentLibrary, setCurrentLibrary] = useState(JSON.parse(localStorage.getItem('myLibrary')))

   const handleClick = (id) => {
      currentLibrary = currentLibrary.filter(element => element.id !== id);
      localStorage.setItem("myLibrary", JSON.stringify(currentLibrary));
      setCurrentLibrary([...currentLibrary]);
   }

   console.log(currentLibrary);

   return (
      <>
         {
            currentLibrary ? currentLibrary.map((current) => {
               return <div key={current.id} onClick={() => handleClick(current.id)}>{current.title}</div>
            }):('')
         }
      </>
   )
}