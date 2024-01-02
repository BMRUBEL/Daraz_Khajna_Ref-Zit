import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const currencyExchangeRateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  currency currency exchange rate
    currencyExchange: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/currency-exchange-rate/all",
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
      providesTags: [tagTypes.currencyexchangerate],
    }),
    // currencyExchange drop down
    currencyExchangeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/currency-exchange-rate/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.currencyexchangerate],
    }),

    // get single currencyExchange
    getSingleCurrencyExchange: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/currency-exchange-rate/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.currencyexchangerate],
    }),
    // create a new currencyExchange
    addCurrencyExchange: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/currency-exchange-rate/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.currencyexchangerate],
    }),
    // update ac department
    updateCurrencyExchange: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/currency-exchange-rate/update/${data.id}`,
        method: "PUT",
        data: data?.body,
        
      }),
      invalidatesTags: [tagTypes.currencyexchangerate],
    }),
  }),
});

export const {
  useCurrencyExchangeQuery,
  useCurrencyExchangeDropdownQuery,
  useGetSingleCurrencyExchangeQuery,
  useAddCurrencyExchangeMutation,
  useUpdateCurrencyExchangeMutation,
} = currencyExchangeRateApi;
