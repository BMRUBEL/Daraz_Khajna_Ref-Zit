import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const upazillaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Upazilla
    upazilla: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/upazila/all",
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
      providesTags: [tagTypes.upazilla],
    }),
    // Upazilla dropdown
    upazillaDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/district/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.upazilla],
    }),

    // get single Upazilla
    getSingleupazilla: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/upazila/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.upazilla],
    }),
    // create a new Upazilla
    addUpazilla: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/upazila/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.upazilla],
    }),
    // update ac Upazilla
    updateupazilla: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/upazila/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.upazilla],
    }),
  }),
});

export const {
  useUpazillaQuery,
  useUpazillaDropdownQuery,
  useGetSingleupazillaQuery,
  useAddUpazillaMutation,
  useUpdateupazillaMutation,
} = upazillaApi;
