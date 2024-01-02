import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const transactionSourceTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  transactions
    transactionsources: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-source-type/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          }
        };
      },
      providesTags: [tagTypes.transaction],
    }),

    // transAllsourceType
    transsourctype: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-source-type/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),

    // get single transaction
    getSingleTransactionsource: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-source-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    // create a new transaction
    addTransactionSource: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-source-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    // update ac department
    updateTransactionSource: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/tran-source-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
  }),
});

export const {
  useTransactionsourcesQuery,
  useTranssourctypeQuery,
  useGetSingleTransactionsourceQuery,
  useAddTransactionSourceMutation,
  useUpdateTransactionSourceMutation
} = transactionSourceTypeApi;
