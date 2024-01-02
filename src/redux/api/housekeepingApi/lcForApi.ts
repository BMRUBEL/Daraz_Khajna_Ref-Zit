import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const lcForApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  lcfor
    lcfors: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/lc-for/all",
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
      providesTags: [tagTypes.lcfor],
    }),
   
  

    // get single lcfor
    getSingleLcfor: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/lc-for/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.lcfor],
    }),
    // create a new lcfor
    addLcFor: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/lc-for/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.lcfor],
    }),
    // update lcfor
    updateLCfor: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/lc-for/update/${data.id}`,
        method: "PUT",
        data: data?.body
      }),
      invalidatesTags: [tagTypes.lcfor],
    }),
  }),
});

export const {
  useLcforsQuery,
  useTranssourctypeQuery,
  useGetSingleLcforQuery,
  useAddLcForMutation,
  useUpdateLCforMutation
} = lcForApi;
