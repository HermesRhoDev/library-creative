import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/ToastConfig/toastConfig";

export const Library = () => {
  let [currentLibrary, setCurrentLibrary] = useState(
    JSON.parse(localStorage.getItem("myLibrary"))
  );

  const handleDeleteClick = (id) => {
    currentLibrary = currentLibrary.filter((element) => element.id !== id);
    localStorage.setItem("myLibrary", JSON.stringify(currentLibrary));
    setCurrentLibrary([...currentLibrary]);
    toast.success("Suppression effectué !", { toastConfig });
  };

  return (
    <>
      {currentLibrary.length != 0
        ? currentLibrary.map((current) => {
            return (
              <div key={current.id} className="bg-black text-white m-5 p-3">
                <h1>Titre du livre: {current.title}</h1>
                <Link to={"/library/book/" + current.id}>Voir</Link>
                <br />
                <button onClick={() => handleDeleteClick(current.id)}>
                  Supprimer
                </button>
              </div>
            );
          })
        : "Aucun livre dans votre collection !"}
    </>
  );
};
