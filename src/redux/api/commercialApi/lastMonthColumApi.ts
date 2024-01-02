import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const lastMonthColumApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Last Month Colum
    lastMonthColum: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/last-month-closing/all",
          method: "GET",
          params: { 
            pageNo: arg.page !== undefined ? arg.page : 1,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
           },
        };
      },
      providesTags: [tagTypes.lastmonthcolum],
    }),
  // get vatMonth
  vatMonth: build.query({
    query: (inputDate: Record<string, any>) => {
      return {
        url: `/setting/api/v1/commercial/fiscalYearVatMonthFromInputDate?inputDate=${inputDate}`,
        method: "GET",
        // params: {          
        //   inputDate: arg.inputDate
        // },
      };
    },
    providesTags: [tagTypes.lastmonthcolum],
  }),
    // get single Last Month Colum
    getSingleLastMonthColum: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/last-month-closing/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.lastmonthcolum],
    }),
    // create a new Last Month Colum
    addLastMonthColum: build.mutation({
      query: (data) => ({
        url: "/commercial/api/v1/last-month-closing/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.lastmonthcolum],
    }),
  }),
});

export const {
  useLastMonthColumQuery,
  useVatMonthQuery,
  useGetSingleLastMonthColumQuery,
  useAddLastMonthColumMutation,

} = lastMonthColumApi;
