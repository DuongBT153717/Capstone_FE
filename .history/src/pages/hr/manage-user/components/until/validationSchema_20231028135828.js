import * as Yup from "yup";
export const validationSchema =  Yup.object({
      username: Yup.string()
      .matches(/^[a-zA-Z0-9_]+$/, 'Username should only contain letters, numbers, and underscores')
      .required('Username is required'),
      role: Yup.string().required("Role is require!"),
      departmentName: Yup.string().required("Required"),
  });