import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const cityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  city
    cityes: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/city/all",
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
      providesTags: [tagTypes.city],
    }),
    // transAllsourceType
    citydropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/country/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.city],
    }),

    // get single city
    getSingleCity: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/city/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.city],
    }),
    // create a new city
    addCity: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/city/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.city],
    }),
    // update city
    updateCity: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/city/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.city],
    }),
  }),
});

export const {
  useCityesQuery,
  useCitydropdownQuery,
  useGetSingleCityQuery,
  useAddCityMutation,
  useUpdateCityMutation
} = cityApi;
