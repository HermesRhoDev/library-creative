import { useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";

export const LibraryBook = () => {
  let { id } = useParams();

  const [books, setBooks] = useState(JSON.parse(localStorage.getItem('myLibrary')));

  const book = books.find((b) => b.id === id);

  const index = books.findIndex((b) => b.id === id);

  const add = (value) => {
    const bookCopy = { ...book };
    
    const booksListCopy = [...books];

    bookCopy.summary = value;

    booksListCopy[index] = bookCopy;

    localStorage.setItem('myLibrary', JSON.stringify(booksListCopy));
  }

  return (
    <>
    <Formik
          initialValues={{
            summary: "",
          }}
          validationSchema={null}
          onSubmit={(value) => {
            add(value.summary);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-3/4 flex flex-col items-center gap-10">
              <div className="flex flex-col gap-3">
                <div>
                  <Field
                    as="textarea"
                    id="summary"
                    name="summary"
                    placeholder="Summary"
                    className="text-black px-5 py-3 font-bold"
                  />
                </div>
              </div>

              <button
                className="text-black bg-white p-5 w-44 font-bold"
                type="submit"
              >
                Valider
              </button>
            </Form>
          )}
        </Formik>
    </>
  );
};