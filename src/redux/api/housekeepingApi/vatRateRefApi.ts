import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatRateRefApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  vatrateref
    vatRateRef: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-rate-reference/all",
          method: "GET",
          params: { pageNo: arg.page, pageSize: arg.size, filter: arg.filter, dbFieldName: arg.sortField, sortDirection: arg.sortDirection },
          // params: { pageNo: 1, pageSize: 20, filter: "",dbFieldName:"id",sortDirection:'ASC' },
        };
      },
      providesTags: [tagTypes.vatrateref],
    }),

    // get single vatrateref
    getSingleVatrateref: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-rate-reference/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatrateref],
    }),
    // create a new vatrateref
    addVatrateref: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-rate-reference/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatrateref],
    }),
    // update vatrateref
    updateVatrateref: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-rate-reference/update/${data.id}`,
        method: "PUT",
        data:data?.body,
      }),
      invalidatesTags: [tagTypes.vatrateref],
    }),
  }),
});

export const {
  useVatRateRefQuery,
  useGetSingleVatraterefQuery,
  useAddVatraterefMutation,
  useUpdateVatraterefMutation,
} = vatRateRefApi;
