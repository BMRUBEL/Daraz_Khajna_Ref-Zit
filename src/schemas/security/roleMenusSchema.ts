import * as yup from "yup";

export const roleMenusSchema = yup.object().shape({
  trnsTypeName: yup.string().required("Roles Name is required"),
  trnsTypeNameBn: yup.string().required("Gurd Name is required"),
  });
