import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";

export const LibraryBook = () => {
  let { id } = useParams();

  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("myLibrary"))
  );

  const book = books.find((b) => b.id === id);

  const index = books.findIndex((b) => b.id === id);

  const add = (value) => {
    const bookCopy = { ...book };

    const booksListCopy = [...books];

    bookCopy.summary = value;

    booksListCopy[index] = bookCopy;

    localStorage.setItem("myLibrary", JSON.stringify(booksListCopy));
  };

  return (
    <>
      <div className="h-full w-full flex flex-row overflow-hidden">
        <div className="w-1/2 h-full bg-black flex flex-col p-5 justify-evenly">
          <h1 className="text-white font-bold text-4xl text-center">
            {book.title}
          </h1>
          <div className="flex flex-row items-center p-5">
            <div className="flex-1 h-full">
              <img
                className="w-full"
                src={book.image}
                alt="Couverture du livre"
              />
            </div>
            <div className="flex-1 h-full">
              <div className="p-5 flex flex-col justify-between h-full">
                <p className="text-white">
                  <b>Titre du livre: </b>
                  {book.title}
                </p>
              </div>
              <div className="text-white">{book.summary}</div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center gap-20">
          <GoBack />
          <h1 className="uppercase font-bold text-black text-4xl">
            MON RéSUMé
          </h1>
          <div className="w-full flex justify-center">
            <Formik
              initialValues={{
                summary: "",
              }}
              validationSchema={null}
              onSubmit={(value) => {
                add(value.summary);
                window.location.reload(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className="w-3/4 flex flex-col items-center gap-10">
                  <div className="flex flex-col gap-3 h-fit">
                    <Field
                      as="textarea"
                      id="summary"
                      name="summary"
                      placeholder="Résumé"
                      className="bg-black text-white font-bold p-5 w-72 min-h-fit"
                    />
                  </div>

                  <button
                    className="text-white bg-black p-5 w-44 font-bold"
                    type="submit"
                  >
                    Valider
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
