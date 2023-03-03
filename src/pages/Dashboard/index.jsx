import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Logout } from "../../components/Logout";
import { UserContext } from "../../context/authContext";
import { toastConfig } from "../../utils/ToastConfig/toastConfig";

export const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const [books, setBooks] = useState(null);
  const [search, setSearch] = useState(null);
  const [library, setLibrary] = useState(null);

  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=$%7Bexample%7D&maxResults=20",
        {
          headers: {
            "Content-Type": "text/json",
          },
        }
      );
      setBooks(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addBookToLibrary = (id, title, image, subtitle) => {
    let libraryExist = JSON.parse(localStorage.getItem("myLibrary"));
    if (libraryExist == null) libraryExist = [];
    let entry = {
      id: id,
      title: title,
      subtitle: subtitle,
      image: image,
      summary: null,
    };
    if (libraryExist) {
      const bookExist = libraryExist.find((book) => book["id"] === id);
      if (bookExist) {
        toast.error("Livre déjà ajouté !", { toastConfig });
      } else {
        libraryExist.push(entry);
        localStorage.setItem("myLibrary", JSON.stringify(libraryExist));
        setLibrary(libraryExist);
        toast.success("Ajout effectué !", { toastConfig });
      }
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    getBooks();
  }, [currentUser]);

  return (
    <>
      {currentUser ? (
        <div className="w-full h-full flex flex-row">
          <div className="bg-black h-full w-1/5 p-5 flex flex-col gap-10">
            <h1 className="text-white text-center font-bold uppercase flex flex-row justify-evenly items-center">
              <span className="rounded-full bg-white w-5 h-2 block"></span>
              My Library
              <span className="rounded-full bg-white w-5 h-2 block"></span>
            </h1>
            <nav className="flex flex-col items-center justify-between h-full">
              <li>
                <input
                  className="p-2"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher"
                />
              </li>
              <li>
                <Link
                  to="/library"
                  className="text-black uppercase font-bold px-5 py-2 bg-white"
                >
                  Ma Collection
                </Link>
              </li>
              <li>
                <Logout />
              </li>
            </nav>
          </div>
          <div className="w-4/5 h-full overflow-y-auto flex flex-wrap items-center justify-center gap-5 p-5">
            {books
              ? books
                  .filter((book) => {
                    if (!search) return book;
                    else if (
                      book["volumeInfo"]["title"]
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                      return book;
                  })
                  .map((book) => {
                    let id = book["id"];
                    let title = book["volumeInfo"]["title"];
                    let thumbnail =
                      book["volumeInfo"]["imageLinks"]["thumbnail"];
                    let subtitle = book["volumeInfo"]["subtitle"];

                    return (
                      <div
                        key={id}
                        className="w-1/4 flex flex-col items-center border border-black h-fit"
                      >
                        <img src={thumbnail} alt="" />
                        <p className="break-words p-3 text-center">{title}</p>
                        <Link to={"/dashboard/book/" + id}>Voir</Link>
                        <button
                          onClick={() =>
                            addBookToLibrary(id, title, thumbnail, subtitle)
                          }
                        >
                          Ajouter
                        </button>
                      </div>
                    );
                  })
              : ""}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-20 justify-center items-center bg-black">
          <h1 className="text-white font-bold uppercase text-5xl">
            ! vous devez être connecté !
          </h1>
          <Link
            className="text-black bg-white p-5 w-44 font-bold text-center uppercase"
            to="/signin"
          >
            Se Connecter
          </Link>
        </div>
      )}
    </>
  );
};
