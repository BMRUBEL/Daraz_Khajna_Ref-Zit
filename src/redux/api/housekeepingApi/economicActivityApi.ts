import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const economicActivityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  economic activity
    economicActivity: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/economic-activity/all",
          method: "GET",
          params: {
            pageNo: arg.page,
            pageSize: arg.size,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.economicactivity],
    }),

    // get single economicactivity
    getSingleEconomicActivity: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/economic-activity/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.economicactivity],
    }),
    // create a new economicactivity
    addEconomicActivity: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/economic-activity/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.economicactivity],
    }),
    // update a existing economicactivity
    updateEconomicActivity: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/economic-activity/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.economicactivity],
    }),
  }),
});

export const {
  useEconomicActivityQuery,
  useGetSingleEconomicActivityQuery,
  useAddEconomicActivityMutation,
  useUpdateEconomicActivityMutation,
} = economicActivityApi;
