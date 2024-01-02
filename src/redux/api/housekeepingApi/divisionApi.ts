import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Division
    division: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/division/all",
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
      providesTags: [tagTypes.division],
    }),
    // Division dropdown
    divisionDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/country/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.division],
    }),

    // get single Division
    getSingledivision: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/division/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.division],
    }),
    // create a new Division
    addDivision: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/division/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.division],
    }),
    // update ac Division
    updateDivision: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/division/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.division],
    }),
  }),
});

export const {
  useDivisionQuery,
  useDivisionDropdownQuery,
  useGetSingledivisionQuery,
  useAddDivisionMutation,
  useUpdateDivisionMutation,
} = divisionApi;
