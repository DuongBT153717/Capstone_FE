import * as Yup from "yup";
export const validationSchema = Yup.object({
    title: Yup.string()
    .required('Required'),
    content: Yup.string()
    .required('Required'),
    departmentId: Yup.string()
    .required('Required'),
    receiveIdAndDepartment: Yup.string()
    .required('Required'),
    role: Yup.string()
    .required('Required'),
    department: Yup.string()
    .required('Required'),
    getAllManagerDepartment: Yup.string()
    .required('Required'),
    manager: Yup.string()
    .required('Required'),
    dateFrom: Yup.string()
    .required('Required'),
    dateTo: Yup.string()
    .required('Required'),
    checked: Yup.string()
    .required('Required'),
 
    
    
})
