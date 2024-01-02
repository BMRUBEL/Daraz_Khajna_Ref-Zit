import * as yup from "yup";

export const itemSubgroupSchema = yup.object().shape({
  trnsSourceTypeId: yup.string().required("Item Group Name is required"),
  trnsTypeName: yup.string().required("Sub Group Name is required"),
  trnsTypeNameBn: yup.string().required("Sub Group Name Bn is required"),
  subgroupPrefix: yup.string().required("Sub Group Prefix is required"),
  inventoryMethod: yup.string().required("Inventory Method is required"),
});
