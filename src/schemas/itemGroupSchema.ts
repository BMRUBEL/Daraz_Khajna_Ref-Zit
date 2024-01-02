import * as yup from "yup";

export const itemGroupSchema = yup.object().shape({
  itmGrpPrefix: yup.string().required("Item Group Prefix is required"),
  itmGrpName: yup.string().required("Item Group Name is required"),
  itmGrpNameBn: yup.string().required("Item Group Name Bn is required"),
  itmMstrGrpId: yup.string().required("Master Group is required"),
  uomSetId: yup.string().required("UOM Set is required"),

});
