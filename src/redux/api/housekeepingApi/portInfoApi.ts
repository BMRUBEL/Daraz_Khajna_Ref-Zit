import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const portInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  transactions
    portInfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/port/all",
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
      providesTags: [tagTypes.portinfo],
    }),
  
    // get single transaction
    getSinglePortInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/port/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.portinfo],
    }),
    // create a new transaction
    addPortInfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/port/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.portinfo],
    }),
    // update ac department
    updatePortInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/port/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.portinfo],
    }),
  }),
});

export const {
  usePortInfoQuery,
  useGetSinglePortInfoQuery,
  useAddPortInfoMutation,
  useUpdatePortInfoMutation,
} = portInfoApi;
