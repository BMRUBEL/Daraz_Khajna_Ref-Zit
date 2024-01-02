import * as yup from "yup";

export const lastMonthClosingSchema = yup.object().shape({
    transactionDate: yup.string().required("Transaction Date is required"),
    lastMonthClosingBalanceVat: yup.string().required("LMC VAT Amount is required"),
    lastMonthClosingBalanceSd: yup.number().required("LMC SD Amount is required"),
});