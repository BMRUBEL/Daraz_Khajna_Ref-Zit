import * as yup from "yup";

export const uomInfoSchema = yup.object().shape({
    uomSetId: yup.string().required(" UOM Set Name is required"),
    uomShortCode: yup.string().required(" UOM Short Code is required"),
    uomDesc: yup.string().required("UOM Desk is required"),
    uomLocalDesc: yup.string().required("UOM Local Desk is required"),
    relativeFactor: yup.string().required("Relative Factor is required"),
    fractionAllow: yup.string().required("Factor Allow is required"),
  });
   