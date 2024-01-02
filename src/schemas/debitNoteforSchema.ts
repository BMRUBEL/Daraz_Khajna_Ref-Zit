import * as yup from "yup";

export const debitNoteforSchema = yup.object().shape({

  name: yup.string().required("Debit Note Name is required"),
  nameBn: yup.string().required("Debit Note Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
