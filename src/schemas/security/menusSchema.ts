import * as yup from "yup";

export const menusSchema = yup.object().shape({
  trnsSourceTypeId: yup.string().required("Tran Source Type Name is required"),
  trnsTypeName: yup.string().required("Menu Name is required"),
  trnsTypeNameBn: yup.string().required("Menu Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
