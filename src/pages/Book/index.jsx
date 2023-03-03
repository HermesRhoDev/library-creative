import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Logout } from "../../components/Logout";
import { UserContext } from "../../context/authContext";
import { TabTitle } from "../../utils/tabtitle";

export const Book = () => {
  TabTitle("Consultation - Library Creative");

  let { id } = useParams();
  const [book, setBook] = useState(null);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const getBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`,
        {
          headers: {
            "Content-Type": "text/json",
          },
        }
      );
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    getBook();
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
            {book ? (
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">
                    {book.volumeInfo.title}
                  </div>
                  <div class="text-ml mb-1">{book.volumeInfo.subtitle}</div>
                </div>
                <div class="px-6 pt-4 pb-2">
                  Auteur :{" "}
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {book.volumeInfo.authors[0]}
                  </span>{" "}
                </div>
              </div>
            ) : (
              ""
            )}
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
