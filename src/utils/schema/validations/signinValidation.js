import * as Yup from "yup";

export const SignInSchemaValidation = Yup.object().shape({
  pseudo: Yup.string()
    .max(200, "Le Pseudo doit faire 20 caractere maximum !")
    .required("Requis !"),
  email: Yup.string().email("Adresse mail invalide !").required("Requis !"),
});