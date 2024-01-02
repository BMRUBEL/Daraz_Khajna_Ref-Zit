import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatMonthInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  vat month info
    vatmonth: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-month/all",
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
      providesTags: [tagTypes.vatmonthinfo],
    }),
    // Get vat month info drop down
    vatMonthInfoDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/fiscal-year/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.vatmonthinfo],
    }),

    // get single vat month info
    getSingleVatMonth: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-month/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatmonthinfo],
    }),
    // create a new vat month info
    addVatMonth: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-month/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatmonthinfo],
    }),
    // update ac department
    updateVatMonth: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-month/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.vatmonthinfo],
    }),
  }),
});

export const {
  useVatmonthQuery,
  useVatMonthInfoDropDownQuery,
  useGetSingleVatMonthQuery,
  useAddVatMonthMutation,
  useUpdateVatMonthMutation,
} = vatMonthInfoApi;
