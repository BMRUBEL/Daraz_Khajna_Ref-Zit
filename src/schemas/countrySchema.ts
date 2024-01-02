import * as yup from "yup";

export const countrySchema = yup.object().shape({
  code: yup.string().required("Country Code is required"),
  codeBn: yup.string().required("Country Code Name is required"),
  name: yup.string().required("Country Name is required"),
  nameBn: yup.string().required("Country Name Bn is required"),
 // shippingcost: yup.string().required("Shipping Cost is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
