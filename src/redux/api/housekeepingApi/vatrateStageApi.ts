import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatrateStageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  vatratestage
    vatratestages: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-rate-stage/all",
          method: "GET",
          params: { 
            pageNo: arg.page,
            pageSize: arg.size,
            filter: arg.filter, dbFieldName: arg.sortField, sortDirection: arg.sortDirection }
        };
      },
      providesTags: [tagTypes.vatratestage],
    }),
    // transAllsourceType
    vatRateStageDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-rate-stage/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.vatratestage],
    }),

    // get single vatratestage
    getSingleVatratestage: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-rate-stage/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatratestage],
    }),
    // create a new vatratestage
    addVatratestage: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-rate-stage/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatratestage],
    }),
    // update vatratestage
    updateVatrateStage: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-rate-stage/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.vatratestage],
    }),
  }),
});

export const {
  useVatratestagesQuery,
  useVatRateStageDropdownQuery,
  useGetSingleVatratestageQuery,
  useAddVatratestageMutation,
  useUpdateVatrateStageMutation,
} = vatrateStageApi;
