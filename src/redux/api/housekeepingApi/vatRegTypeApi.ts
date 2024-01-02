import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatRegTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  VAT Registration Type
    vatRegType: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-registration-type/all",
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
      providesTags: [tagTypes.vatregtype],
    }),

    // get single VAT Registration Type
    getSingleVatRegType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-registration-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatregtype],
    }),

    // create a new vat reg type
    addVatRegType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-registration-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatregtype],
    }),
    // update single item
    updateVatRegType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-registration-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.vatregtype],
    }),
  }),
});

export const {
  useVatRegTypeQuery,
  useGetSingleVatRegTypeQuery,
  useAddVatRegTypeMutation,
  useUpdateVatRegTypeMutation,
} = vatRegTypeApi;
