import * as yup from "yup";

export const areaofEconomicActivitySchema = yup.object().shape({
  economicActivityId: yup.string().required("Economic Activity Name is required"),
  economicActivityAreaName: yup.string().required("Area Of Economic Activity Name is required"),
  economicActivityAreaNameBn: yup.string().required("Area Of Economic Activity Name BN is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
