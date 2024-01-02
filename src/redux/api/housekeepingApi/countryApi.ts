import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  country
    country: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/country/all",
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
      providesTags: [tagTypes.country],
    }),

    // get single country
    getSingleCountry: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/country/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.country],
    }),
    // create a new country
    addCountry: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/country/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.country],
    }),
    // update ac country
    updateCountry: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/country/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.country],
    }),
  }),
});

export const {
  useCountryQuery,
  useGetSingleCountryQuery,
  useAddCountryMutation,
  useUpdateCountryMutation
} = countryApi;
