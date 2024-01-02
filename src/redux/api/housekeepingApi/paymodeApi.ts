import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const districtApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Paymode
    paymode: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/pay-mode/all",
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
      providesTags: [tagTypes.transaction],
    }),

    // get single Paymode
    getSinglePaymode: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/pay-mode/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.paymentmode],
    }),
    // create a new Paymode
    addPaymode: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/pay-mode/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.paymentmode],
    }),
    // update ac Paymode
    updatePaymode: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/pay-mode/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.paymentmode],
    }),
  }),
});

export const {
  usePaymodeQuery,
  useGetSinglePaymodeQuery,
  useAddPaymodeMutation,
  useUpdatePaymodeMutation,
} = districtApi;
