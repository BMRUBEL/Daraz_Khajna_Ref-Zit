import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const tranSubTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  transactions
    transsubtypes: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-sub-type/all",
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
      providesTags: [tagTypes.transsubtype],
    }),
    // transAllsourceType
    transubtypedropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-type/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transsubtype],
    }),
    
    // get single transaction
    getSingleTransactionsubtype: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-sub-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transsubtype],
    }),
    // create a new transaction
    addTransactionSubType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-sub-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transsubtype],
    }),
    // update ac department
    updateTransactionSubType: build.mutation({
      query: (data) => ({
        url:`/setting/api/v1/tran-sub-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.transsubtype],
    }),
  }),
});

export const {
  useTranssubtypesQuery,
  useTransubtypedropdownQuery,
  useGetSingleTransactionsubtypeQuery,
  useAddTransactionSubTypeMutation,
  useUpdateTransactionSubTypeMutation,
} = tranSubTypeApi;
