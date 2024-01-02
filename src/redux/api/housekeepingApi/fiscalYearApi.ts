import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const fiscalYearApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  fiscal year
    fiscalYearInfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/fiscal-year/all",
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
      providesTags: [tagTypes.fiscalyearinfo],
    }),

    // get single fiscal year
    getSingleFiscalYear: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/fiscal-year/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.fiscalyearinfo],
    }),
    // create a ne fiscal year
    addFiscalYear: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/fiscal-year/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.fiscalyearinfo],
    }),
    // update a existing fiscal year
    updateFiscalYearInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/fiscal-year/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.fiscalyearinfo],
    }),
  }),
});

export const {
  useFiscalYearInfoQuery,
  useGetSingleFiscalYearQuery,
  useAddFiscalYearMutation,
  useUpdateFiscalYearInfoMutation,
} = fiscalYearApi;
