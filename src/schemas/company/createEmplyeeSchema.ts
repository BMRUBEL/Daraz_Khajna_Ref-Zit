import * as yup from "yup";

export const createEmployeeSchema = yup.object().shape({
  uploadImage: yup.string().required("Image is required"),
  departmentName: yup.string().required("Select department"),
  designation: yup.string().required("Designation is required"),
  employeeCode: yup.number().required("Employee Code is required"),
  employeeCodeBn: yup.string().required("Employee Code Bn is required"),
  employeeName: yup.string().required("Employee Name is required"),
  employeeNameBn: yup.string().required("Employee Name Bn is required"),
  employeeType: yup.string().required("Employee Type is required"),
  employeeAddress: yup.string().required("Employee Address is required"),
  employeeAddressBn: yup.string().required("Employee Address Bn is required"),
  phoneNumber: yup.number().required("Phone Nmmber is required"),
  emailAddress: yup.string().required("Email Address is required"),
  nid: yup.number().required("Employee NID is required"),
  uploadNid: yup.string().required("Uplaod NID"),
});
