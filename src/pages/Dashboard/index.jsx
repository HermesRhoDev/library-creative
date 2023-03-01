import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../components/Logout";
import { UserContext } from "../../context/authContext";

export const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const [books, setBooks] = useState(null);

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

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    getBooks();
  }, [currentUser]);

  if(books){
   console.log(books[0])
  }

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
              <li>
                <Logout />
              </li>
            </nav>
          </div>
          <div className="bg-blue-400 w-4/5 h-full overflow-y-auto">
            {
               books ? books.map((book) => {
                  let id = book['id'];
                  let title = book['volumeInfo']['title'];
                  let pageCount =  book['volumeInfo']['pageCount'];
                  let authors = book['volumeInfo']['authors'];
                  let thumbnail = book['volumeInfo']['imageLinks']['thumbnail'];

                  return (
                     <div key={id}>
                        <h1>{title}</h1>
                        <h2>{pageCount}</h2>
                        <h3>{authors}</h3>
                        <img src={thumbnail} alt="" />
                        <br />
                     </div>
                  )
               }) : ''
            }
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