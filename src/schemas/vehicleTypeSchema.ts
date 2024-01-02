import * as yup from "yup";

export const vehicleTypeSchema = yup.object().shape({
  name: yup.string().required("Vehicle Type Name is required"),
  nameBn: yup.string().required("Vehicle Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
