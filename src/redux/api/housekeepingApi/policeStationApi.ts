import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const policeStationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  policestation
    policestation: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/police/all",
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
      providesTags: [tagTypes.policestation],
    }),
    // policestation All
    policestationdropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/district/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.policestation],
    }),

    // get single policestation
    getSinglePoliceStation: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/police/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.policestation],
    }),
    // create a new policestation
    addPoliceStation: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/police/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.policestation],
    }),
    // update policestation
    updatePoliceStation: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/police/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.policestation],
    }),
  }),
});

export const {
  usePolicestationQuery,
  usePolicestationdropdownQuery,
  useGetSinglePoliceStationQuery,
  useAddPoliceStationMutation,
  useUpdatePoliceStationMutation
} = policeStationApi;
