import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const areaofEconomicActivityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  areaofeconomicactivity
    areaofeconomicactivity: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/economic-activity-area/all",
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
      providesTags: [tagTypes.areaofeconomicactivity],
    }),
    // areaofeconomicactivity All
    EconomicActivitydropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/economic-activity/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.areaofeconomicactivity],
    }),

    // get single areaofeconomicactivity
    getSingleAreaofEconomic: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/economic-activity-area/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.areaofeconomicactivity],
    }),
    // create a new areaofeconomicactivity
    addAreaofEconomic: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/economic-activity-area/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.areaofeconomicactivity],
    }),
    // update areaofeconomicactivity
    updateAreaofEconomic: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/economic-activity-area/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.areaofeconomicactivity],
    }),
  }),
});

export const {
  useAreaofeconomicactivityQuery,
  useEconomicActivitydropdownQuery,
  useGetSingleAreaofEconomicQuery,
  useAddAreaofEconomicMutation,
  useUpdateAreaofEconomicMutation
} = areaofEconomicActivityApi;
