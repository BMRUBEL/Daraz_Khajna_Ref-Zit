import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatPayMethodApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  VAT Payemnt method
    vatPayMethod: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/setting/api/v1/vat-pay-method/all`,
          method: "GET",
          params: { pageNo: arg.page, pageSize: arg.pageSize, filter: arg.filter, dbFieldName: arg.sortField, sortDirection: arg.sortDirection },
          
        };
      },
      providesTags: [tagTypes.vatpaymethod],
    }),

    // Tran Sub Type Drop down
    tranSubTypeDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-pay-method/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.vatpaymethod],
    }),

    // get single VAT Payemnt method
    getSingleVatPayMethod: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-pay-method/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatpaymethod],
    }),

    // create a new VAT Payemnt method
    addVatPayMethod: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-pay-method/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatpaymethod],
    }),
    // update single VAT Payemnt method
    updateVatPayMethod: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-pay-method/update/${data.id}`,
        method: "PUT",
        data:data?.body,
      }),
      invalidatesTags: [tagTypes.vatpaymethod],
    }),
  }),
});

export const {
  useVatPayMethodQuery,
  useTranSubTypeDropDownQuery,
  useGetSingleVatPayMethodQuery,
  useAddVatPayMethodMutation,
  useUpdateVatPayMethodMutation,
} = vatPayMethodApi;
