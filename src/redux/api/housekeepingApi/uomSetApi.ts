import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const uomSetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  uom set
    uomSet: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/uom-set/all",
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
      providesTags: [tagTypes.uomset],
    }),

    // get single uom set
    getSingleUomSet: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/uom-set/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.uomset],
    }),

    // create a new uom set
    addUomSet: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/uom-set/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.uomset],
    }),
    // update a single uom set
    updateUomSet: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/uom-set/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.uomset],
    }),
  }),
});

export const {
  useUomSetQuery,
  useGetSingleUomSetQuery,
  useAddUomSetMutation,
  useUpdateUomSetMutation,
} = uomSetApi;
