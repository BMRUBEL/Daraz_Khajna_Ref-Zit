import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const othersAdjustmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  otheradjustment
    othersadjustments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/other-adjt/all",
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
      providesTags: [tagTypes.otheradjustment],
    }),
    // transAllsourceType
    otheradjustdropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/other-adjt/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),

    // get single otheradjustment
    getSingleHkOtherAdjustment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/other-adjt/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.otheradjustment],
    }),
    // create a new otheradjustment
    addOtheradjustment: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/other-adjt/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.otheradjustment],
    }),
    // update otheradjustment
    updateOtheradjustment: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/other-adjt/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.otheradjustment],
    }),
  }),
});

export const {
  useOthersadjustmentsQuery,
  useOtheradjustdropdownQuery,
  useGetSingleHkOtherAdjustmentQuery,
  useAddOtheradjustmentMutation,
  useUpdateOtheradjustmentMutation
} = othersAdjustmentApi;
