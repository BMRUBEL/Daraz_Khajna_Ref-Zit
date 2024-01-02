import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const bankInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  bankinfo
    bankinfos: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/bank-info/all",
          method: "GET",
          params: {
            pageNo: arg.page,
            pageSize: arg.size,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.bankinfo],
    }),
    // bankinfo
    bankinfodropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/bank-info/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.bankinfo],
    }),

    // get single bankinfo
    getSingleBankInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/bank-info/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bankinfo],
    }),
    // create a new transaction
    addBankinfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/bank-info/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bankinfo],
    }),
    // update ac department
    updateBankinfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/bank-info/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.bankinfo],
    }),
  }),
});

export const {
  useBankinfosQuery,
  useBankinfodropdownQuery,
  useGetSingleBankInfoQuery,
  useAddBankinfoMutation,
  useUpdateBankinfoMutation
} = bankInfoApi;
