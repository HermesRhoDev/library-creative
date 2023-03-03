import axios from "axios";
import { useParams } from "react-router-dom";

export const Book = () => {
  let { id } = useParams();

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
    } catch (error) {
      console.log(error);
    }
  };

  getBook();

  return (
    <>
      <div>{id}</div>
    </>
  );
};
