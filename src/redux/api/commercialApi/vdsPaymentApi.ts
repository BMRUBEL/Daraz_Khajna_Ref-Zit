import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vdsPaymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  VDS Payemnt
    vdsPayment: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/payment/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 1,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.vdspayment],
    }),
    //date api
    vdsPaymentDate: build.query({
      query: (inputDate: Record<string, any>) => {
        return {
          url: `/setting/api/v1/commercial/fiscalYearVatMonthFromInputDate?inputDate=${inputDate}`,
          method: "GET",
          // params: {          
          //   inputDate: arg.inputDate
          // },
        };
      },
      providesTags: [tagTypes.vdsseller],
    }),
  // get All drop down list
  vdsPaymentDropDown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/commercial/api/v1/payment/drop-down",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.vdspayment],
  }),
  // get All drop down list
  vdsPaymentChildDropDown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/commercial/api/v1/payment/drop-down-child",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.vdspayment],
  }),
    // get single VAT Payemnt
    getSingleVdsPayment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/payment/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vdspayment],
    }),
    //Bank Branch from Bank
    getSingleBank: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/bank-info/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.treasurychallan],
    }),
      //Vat Code Detail

      getVatCodeDetail: build.query({
        query: (id: string | string[] | undefined) => {
          return {
            url: `/setting/api/v1/tran-acc-item/find/${id}`,
            method: "GET",
          };
        },
        providesTags: [tagTypes.treasurychallan],
      }),

    // create a new Payemnt
    addVdsPayment: build.mutation({
      query: (data) => ({
        url: "/commercial/api/v1/payment/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vdspayment],
    }),
   
  }),
});

export const {
  useVdsPaymentQuery,
  useVdsPaymentDropDownQuery,
  useVdsPaymentChildDropDownQuery,
  useGetSingleVdsPaymentQuery,
  useGetSingleBankQuery,
  useAddVdsPaymentMutation,
  useGetVatCodeDetailQuery,
  useVdsPaymentDateQuery

} = vdsPaymentApi;
