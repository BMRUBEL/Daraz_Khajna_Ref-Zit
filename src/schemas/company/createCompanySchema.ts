import * as yup from "yup";


export const createCompanySchema = yup.object().shape({
    countryId: yup.number().required("Country Name is required"),
    currencyId: yup.number().required("Currency is required"),
    compCode: yup.string().required("Company Code is required"),
    compTypeId: yup.number().required("To Date is required"),
    compName: yup.string().required("Company Name is required"),
    compNameBn: yup.string().required("Company Name Bn is required"),
    compShortName: yup.string().required("Company Short Name is required"),
    compShortNameBn: yup.string().required("Company Short Name Bn is required"),
    areaCode: yup.string().required("Area Code is required"),
    areaCodeBn: yup.string().required("Area Code Bn is required"),
    compAddress: yup.string().required("Company Address is required"),
    compAddressBn: yup.string().required("Company Address Bn is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    emailAddress: yup.string().required("Email Address is required"),
});

