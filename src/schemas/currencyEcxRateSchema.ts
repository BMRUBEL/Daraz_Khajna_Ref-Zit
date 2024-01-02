import * as yup from "yup";

export const currencyEcxRateSchema = yup.object().shape({
  currencyInfoId: yup.string().required("Currency Name is required"),
  exchangeRateDate: yup.string().required("Exchange Rate Date & Time is required"),
  source: yup.string().required("Source is required"),
  exchangeRate: yup.string().required("Exchange Rate is required"),
  });
