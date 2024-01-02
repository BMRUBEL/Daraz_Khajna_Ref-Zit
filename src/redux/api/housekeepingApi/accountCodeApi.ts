import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const accountCodeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  accountcode
    accountCode: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/account-code-info/all",
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
      providesTags: [tagTypes.accountcode],
    }),

    // get single accountcode
    getSingleAccountCode: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/account-code-info/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.accountcode],
    }),
    // create a new accountcode
    addAccountCode: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/account-code-info/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.accountcode],
    }),
    // update a accountcode
    updateAccountCode: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/account-code-info/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.accountcode],
    }),
  }),
});

export const {
  useAccountCodeQuery,
  useGetSingleAccountCodeQuery,
  useAddAccountCodeMutation,
  useUpdateAccountCodeMutation,
} = accountCodeApi;
