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

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="w-full min-h-full p-5 flex flex-col gap-10">
        <div className="flex flex-row items-center">
          <h1 className="text-center font-bold text-2xl uppercase flex-1">
            MA COLLECTION
          </h1>
          <button
            onClick={goBack}
            className="bg-black text-white font-bold px-5 py-2"
          >
            Retour
          </button>
        </div>
        {!currentLibrary
          ? "Aucun livre dans votre collection !"
          : currentLibrary.length != 0
          ? currentLibrary.map((current) => {
              return (
                <div
                  key={current.id}
                  className="bg-black text-white p-3 flex flex-row gap-5 justify-between"
                >
                  <div className="flex flex-col gap-5">
                    <h2>
                      <b>Titre du livre:</b> {current.title}
                    </h2>
                    <h4>{current.subtitle}</h4>
                    <div className="flex flex-row gap-3 mt-auto">
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
                  </div>
                  <img src={current.image} alt="" className="" />
                </div>
              );
            })
          : "Aucun livre dans votre collection !"}
      </div>
    </>
  );
};
