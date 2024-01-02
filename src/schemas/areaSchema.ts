import * as yup from "yup";

export const areaSchema = yup.object().shape({
  cityId: yup.string().required("City Name is required"),
  name: yup.string().required("Area Name is required"),
  nameBn: yup.string().required("Area Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
