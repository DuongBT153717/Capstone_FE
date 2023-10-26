import * as Yup from "yup";
export const validationSchema = Yup.object({
  email: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please enter a valid email address'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be minimum eight characters, at least one letter and one number'
    )
})
