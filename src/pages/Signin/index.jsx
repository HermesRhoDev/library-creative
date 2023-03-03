import { Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/authContext";
import { SignInSchemaValidation } from "../../utils/schema/validations/signinValidation";
import { toastConfig } from "../../utils/ToastConfig/toastConfig";

export const Signin = () => {
  const { updateToken, currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <>
      <div className="w-full h-screen bg-black flex flex-col justify-center items-center gap-14">
        <h1 className="text-4xl font-bold uppercase text-white">
          Authentification
        </h1>
        <Formik
          initialValues={{
            pseudo: "",
            email: "",
          }}
          validationSchema={SignInSchemaValidation}
          onSubmit={(values) => {
            updateToken("jdjdjdjdjdjdj");
            toast.success("Vous êtes bien connecté !", { toastConfig });
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-3/4 flex flex-col items-center gap-10">
              <div className="flex flex-col gap-3">
                <div>
                  <Field
                    name="pseudo"
                    placeholder="Pseudo"
                    className="text-black px-5 py-3 font-bold"
                  />
                  {errors.pseudo && touched.pseudo ? (
                    <div className="text-white font-bold">{errors.pseudo}</div>
                  ) : null}
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Adresse Mail"
                    className="text-black px-5 py-3 font-bold"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-white font-bold">{errors.email}</div>
                  ) : null}
                </div>
              </div>

              <button
                className="text-black bg-white p-5 w-44 font-bold"
                type="submit"
              >
                Se Connecter
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
