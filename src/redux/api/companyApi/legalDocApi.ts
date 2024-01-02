import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const legalDocApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Legal Documents
    legaldoucuments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/purchase/list",
          method: "GET",
          // params: { pageNo: 1, pageSize: 20, filter: "",dbFieldName:"id",sortDirection:'ASC' },
        };
      },
      providesTags: [tagTypes.customersetup],
    }),


    // get single Legal Documents
    getSingleLegalDocuments: build.query({
      query: (vdsPurchaserMasterId: string | string[] | undefined) => ({
        url: `/inventory/api/v1/local-purchase/find/?vdsPurchaserMasterId=${vdsPurchaserMasterId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customersetup],
    }),

        //Legal Documents drop down
      legalDocumentsDropDown: build.query({
            query: (arg: Record<string, any>) => {
              return {
                url: "/inventory/api/v1/common/item-with-vat-structure?tranSubTypeId=4&fiscalYearId=1&hsCodeId=1&effectiveDate=2023-10-29",
                method: "GET",
                params: arg,
              };
            },
            providesTags: [tagTypes.customersetup],
          }),

    // create a new Legal Documents
    addLegalDocuments: build.mutation({
      query: (data) => ({
        url: "/inventory/api/v1/local-purchase/insert",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
    // update a single Legal Documents
    updateLegalDocuments: build.mutation({
      query: (data) => ({
        url: `/inventory/api/v1/local-purchase/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
  }),
});

export const {
  useLegaldoucumentsQuery,
  useGetSingleLegalDocumentsQuery,
  useLegalDocumentsDropDownQuery, 
  useAddLegalDocumentsMutation,
  useUpdateLegalDocumentsMutation,
} = legalDocApi;
