import { useState } from "react";
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

  console.log(currentLibrary);

  return (
    <>
      {currentLibrary
        ? currentLibrary.map((current) => {
            return (
              <div
                key={current.id}
                onClick={() => handleDeleteClick(current.id)}
              >
                {current.title}
              </div>
            );
          })
        : ""}
    </>
  );
};