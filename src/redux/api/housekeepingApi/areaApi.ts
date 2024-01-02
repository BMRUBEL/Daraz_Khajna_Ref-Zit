import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const areaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  area
    areas: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/area/all",
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
      providesTags: [tagTypes.area],
    }),
    // transAllsourceType
    areadropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/city/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.area],
    }),

    // get single area
    getSingleArea: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/area/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.area],
    }),
    // create a new area
    addArea: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/area/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.area],
    }),
    // update area
    updateArea: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/area/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.area],
    }),
  }),
});

export const {
  useAreasQuery,
  useAreadropdownQuery,
  useGetSingleAreaQuery,
  useAddAreaMutation,
  useUpdateAreaMutation
} = areaApi;
