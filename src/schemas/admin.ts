import * as yup from "yup";

export const vatRebateTypeSchema = yup.object().shape({
  
  vatRebateName: yup.string().required("VAT Rebate Name is required"),
  vatRebateNameBn: yup.string().required("VAT Rebate Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});

  export const economicActivitySchema = yup.object().shape({
    economicActivityName: yup.string().required("Economic activity name is required"),
  economicActivityNameBn: yup.string().required("Economic activity name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});

export const vatRegTypeSchema = yup.object().shape({
  vatRegistrationName: yup.string().trim().required("VAT Reg Name is required"),
  vatRegistrationNameBn: yup.string().trim().required("VAT Reg Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});

export const itemCategorySchema = yup.object().shape({
  itemCatRetailName: yup.string().required("Item Cat Name is required"),
  itemCatRetailNameBn: yup.string().required("Item Cat Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});


export const vatPayMethodSchema = yup.object().shape({
  tranSubTypeId: yup.string().required("Tran Sub Type Name is required"),
  vatPaymentMethodName: yup.string().required("VAT Payment Name is required"),
  vatPaymentMethodNameBn: yup.string().required("VAT Payment Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
