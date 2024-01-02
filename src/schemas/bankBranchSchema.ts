import * as yup from "yup";

export const bankBranchSchema = yup.object().shape({

  bankId: yup.string().required("Bank Name is required"),
  bankBranchName: yup.string().required("Bank Branch Name is required"),
  bankBranchNameBn: yup.string().required("Bank Branch Name Bn is required"),
  bankBranchAddress: yup.string().required("Bank Branch Address is required"),
  bankBranchAddressBn: yup.string().required("Bank Branch Address Bn is required"),
  bankBranchRoutingNo: yup.string().required("Routing Number is required"),
  bankBranchPhoneNumber: yup.string().required("Phone Number is required"),
  bankBranchEmailAddress: yup.string().required("Email Address is required"),
  seqNo: yup.string().required("Sequence Number is required")

});
