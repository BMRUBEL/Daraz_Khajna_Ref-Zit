import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const districtApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all District
    district: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/district/all",
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
      providesTags: [tagTypes.district],
    }),
    // District dropdown
    districtDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/division/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.district],
    }),

    // get single District
    getSingledistrict: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/district/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.district],
    }),
    // create a new District
    addDistrict: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/district/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.district],
    }),
    // update ac District
    updateDistrict: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/district/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.district],
    }),
  }),
});

export const {
  useDistrictQuery,
  useDistrictDropdownQuery,
  useGetSingledistrictQuery,
  useAddDistrictMutation,
  useUpdateDistrictMutation,
} = districtApi;
