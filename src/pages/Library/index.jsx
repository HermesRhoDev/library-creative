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
      <div className="w-full h-full p-5 flex flex-col gap-10">
        {!currentLibrary
          ? "Aucun livre dans votre collection !"
          : currentLibrary.length != 0
          ? currentLibrary.map((current) => {
              return (
                <div
                  key={current.id}
                  className="bg-black text-white p-3 flex flex-col gap-5"
                >
                  <h1>
                    <b>Titre du livre:</b> {current.title}
                  </h1>
                  <div className="flex flex-row gap-3">
                    <Link
                      to={"/library/book/" + current.id}
                      className="bg-white text-black font-bold px-5 py-2"
                    >
                      Voir
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(current.id)}
                      className="bg-white text-black font-bold px-5 py-2"
                    >
                      Supprimer
                    </button>
                  </div>
                  <img src={current.image} alt="" />
                </div>
              );
            })
          : "Aucun livre dans votre collection !"}
      </div>
    </>
  );
};
