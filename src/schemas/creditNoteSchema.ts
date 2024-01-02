import * as yup from "yup";

export const creditNoteSchema = yup.object().shape({

  name: yup.string().required("Credit Note Name is required"),
  nameBn: yup.string().required("Credit Note Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
