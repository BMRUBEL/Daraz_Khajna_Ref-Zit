import * as yup from "yup";

export const inventoryMethodSchema = yup.object().shape({

  invMethodName: yup.string().required("Inventory Method Name is required"),
  invMethodNameBn: yup.string().required("Inventory Method Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
