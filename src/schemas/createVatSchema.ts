import * as yup from "yup";


export const createVatSchema = yup.object().shape({
  hsCodeId: yup.number().required("HS code is required"),
  fiscalYearId: yup.number().required("Fiscal Year is required"),
  // vatRateRefId: yup.number().required("Vat Rate Ref is required"),
  // tranSubTypeId: yup.number().required("Tran Sub Type is required"),
  // vatRateTypeId: yup.number().required("VAT Rate Type Id is required"),
  // prodTypeId: yup.number().required("Product Type Id is required"),
  // effectiveDate: yup.string().required("Effective Date is required"),
  // cd: yup.number().required("CD is required"),
  // sd: yup.number().required("SD is required"),
  // vat: yup.number().required("VAT is required"),
  // at: yup.number().required("AT is required"),
  // ait: yup.number().required("AIT is required"),
  // rd: yup.number().required("RD is required"),
  // isFixedRate: yup.boolean().required("Fixed Rate is required"),
  // fixedRateUomId: yup.number().required("FR UM is required"),
  // fixedRate: yup.number().required("Fixed Rate is required"),

});

