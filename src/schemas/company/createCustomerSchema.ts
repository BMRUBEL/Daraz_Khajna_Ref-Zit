import * as yup from "yup";


export const createCustomerSchema = yup.object().shape({
  // vatRegId: yup.number().required("Select VAT Registration Type"),
  // customerTypeId: yup.number().required("Select Customer Type"),
  customerName: yup.string().required("Customer Name is required"),
  customerNameBn: yup.string().required("Customer Name Bn is required"),
  customerBinNumber: yup.string().required("BIN/NID/Email is required"),
  customerBinNumberBn: yup.string().required("BIN/NID/Email Bn is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  emailAddress: yup.string().required("Email is required"),
  contactPerson: yup.string().required("Contact Person name is required"),
  // bank: yup.number().required("Bank is required"),
  // bankBranch: yup.number().required("Bank Branch is required"),
  // bankAccountType: yup.number().required("Bank Account Type is required"),
  // customerAccountNumber: yup.number().required("Customer Account Number is required"),
  // customerAccountNumberBn: yup.number().required("Customer Account Number Bn is required"),
  // address: yup.number().required("Address is required"),
  // holding: yup.number().required("Holding Number is required"),
  // road: yup.number().required("road is required"),
  // postalCode: yup.number().required("Select postal code "),
  // upazila: yup.number().required("Select Upazila"),
  // district: yup.number().required("Select District"),
  // country: yup.number().required("Select Country"),
});

