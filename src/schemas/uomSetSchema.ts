import * as yup from "yup";

export const uomSetSchema = yup.object().shape({
    uomSet: yup.string().required("Uom Set Name is required"),
    uomSetDesc: yup.string().required("Uom Set Desc Name is required"),
    localUomSetDesc: yup.string().required("Local Uom Set Desc is required"),
  });
