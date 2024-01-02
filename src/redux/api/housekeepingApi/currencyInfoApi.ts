import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const currencyInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  currencyinfo
    currencyinfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/currency/all",
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
      providesTags: [tagTypes.currencyinfo],
    }),


    // get single currencyInfo
    getSingleCurrencyInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/currency/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.currencyinfo],
    }),
    // create a new currencyInfo
    addCurrencyInfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/currency/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.currencyinfo],
    }),
    // update ac department
    updateCurrencyInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/currency/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.currencyinfo],
    }),
  }),
});

export const {
  useCurrencyinfoQuery,
  useGetSingleCurrencyInfoQuery,
  useAddCurrencyInfoMutation,
  useUpdateCurrencyInfoMutation,
} = currencyInfoApi;
