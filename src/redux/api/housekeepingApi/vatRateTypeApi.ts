import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatRateTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Vate Rate Type
    vateRateType: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-rate-type/all",
          method: "GET",
          params: { pageNo: arg.page,
            pageSize: arg.size,
             filter: arg.filter, dbFieldName: arg.sortField, sortDirection: arg.sortDirection }
          
        };
      },
      providesTags: [tagTypes.vatratetype],
    }),

    // get single Vate Rate Type
    getSingleVatRateType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-rate-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatratetype],
    }),
    // create a new Vate Rate Type
    addVatRateType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-rate-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatratetype],
    }),
    // update ac department
    updateVatRateType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-rate-type/update/${data.id}`,
        method: "PUT",
       data: data?.body,
      }),
      invalidatesTags: [tagTypes.vatratetype],
    }),
  }),
});

export const {
  useVateRateTypeQuery,
  useGetSingleVatRateTypeQuery,
  useAddVatRateTypeMutation,
  useUpdateVatRateTypeMutation,
} = vatRateTypeApi;
