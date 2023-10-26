import * as Yup from "yup";
export const validationSchema = Yup.object({
    oldPassword: Yup.string()
    .required('Required'),
    newPassword: Yup.string()
    .required('Required'),
    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    
})
