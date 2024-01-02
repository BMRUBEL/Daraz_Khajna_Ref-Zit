import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const othersAdjustmentTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  transactions
    othersAdjustmentsType: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/other-adjt-type/all",
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
      providesTags: [tagTypes.othersadjustmenttype],
    }),

    // get single othersadjustmenttype
    getSingleOtherAdjustmentType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/other-adjt-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.othersadjustmenttype],
    }),
    // create a new othersadjustmenttype
    addOtherAdjustmentType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/other-adjt-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.othersadjustmenttype],
    }),
    // update ac othersadjustmenttype
    updateOtherAdjustmentType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/other-adjt-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.othersadjustmenttype],
    }),
  }),
});

export const {
  useOthersAdjustmentsTypeQuery,
  useGetSingleOtherAdjustmentTypeQuery,
  useUpdateOtherAdjustmentTypeMutation,
  useAddOtherAdjustmentTypeMutation
} = othersAdjustmentTypeApi;
