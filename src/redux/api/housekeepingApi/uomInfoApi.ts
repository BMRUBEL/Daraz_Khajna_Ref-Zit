import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const uomInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  UOM Info
    uomInfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/uom/all",
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
      providesTags: [tagTypes.uominfo],
    }),
    // UOM Info
    uomInfoDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/uom/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.uominfo],
    }),

    // get single UOM Info
    getSingleUomInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/uom/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.uominfo],
    }),
    // create a new UOM Info
    addUomInfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/uom/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.uominfo],
    }),
    // update ac department
    updateUomInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/uom/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.uominfo],
    }),
  }),
});

export const {
  useUomInfoQuery,
  useUomInfoDropdownQuery,
  useGetSingleUomInfoQuery,
  useAddUomInfoMutation,
  useUpdateUomInfoMutation,
} = uomInfoApi;
