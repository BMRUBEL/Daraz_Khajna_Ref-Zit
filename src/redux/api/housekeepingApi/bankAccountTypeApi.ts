import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const bankAccountTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  bank account type
    bankaccount: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/bank-account-type/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          }
        };
      },
      providesTags: [tagTypes.bankaccounttype],
    }),
 

    // get single bank account
    getSinglebankAccount: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/bank-account-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bankaccounttype],
    }),
    // create a new bank account
    addBankAccount: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/bank-account-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bankaccounttype],
    }),
    // update a bank account
    updateBankAccount: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/bank-account-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.bankaccounttype],
    }),
  }),
});

export const {
  useBankaccountQuery,
  useGetSinglebankAccountQuery,
  useAddBankAccountMutation,
  useUpdateBankAccountMutation
} = bankAccountTypeApi;
