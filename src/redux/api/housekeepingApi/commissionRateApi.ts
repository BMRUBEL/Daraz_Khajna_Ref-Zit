import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const commissionRateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  commisstionrate
    commissionrates: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/commision-rate-info/all",
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
      providesTags: [tagTypes.commisstionrate],
    }),
    // transAllsourceType
    vatmonthdropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/commision-rate-info/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.commisstionrate],
    }),

    // get single commisstionrate
    getSingleCommissionrate: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/commision-rate-info/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.commisstionrate],
    }),
    // create a new commisstionrate
    addCommissionrate: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/commision-rate-info/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.commisstionrate],
    }),
    // update ac commisstionrate
    updateCommissionRate: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/commision-rate-info/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.commisstionrate],
    }),
  }),
});

export const {
  useCommissionratesQuery,
  useVatmonthdropdownQuery,
  useGetSingleCommissionrateQuery,
  useAddCommissionrateMutation,
  useUpdateCommissionRateMutation,
} = commissionRateApi;
