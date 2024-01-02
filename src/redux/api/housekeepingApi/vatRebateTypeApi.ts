import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatRebateTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  vat rebate type
    vatRebateType: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-rebate-type/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          }
        };
      },
      providesTags: [tagTypes.vatrebatetype],
    }),
    

    // get single vat rebate type
    getSingleVatRebateType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-rebate-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatrebatetype],
    }),
    // create a new vat rebate type
    addRebateType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-rebate-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatrebatetype],
    }),
    // update a existing vat rebate type
    updateVatRebateType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-rebate-type/update/${data.id}`,
        method: "PUT",
       data: data?.body,
      }),
      invalidatesTags: [tagTypes.vatrebatetype],
    }),
  }),
});

export const {
  useVatRebateTypeQuery,
  useGetSingleVatRebateTypeQuery,
  useAddRebateTypeMutation,
  useUpdateVatRebateTypeMutation,
} = vatRebateTypeApi;
