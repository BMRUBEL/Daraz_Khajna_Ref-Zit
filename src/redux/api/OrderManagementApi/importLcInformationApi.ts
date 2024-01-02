import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const importLcInformationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Other Adjustment
    importlcinformation: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/other-adjust/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 1,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.otheradjustment],
    }),


    importLCDate: build.query({
      query: (inputDate: Record<string, any>) => {
        return {
          url: `/setting/api/v1/commercial/fiscalYearVatMonthFromInputDate?inputDate=${inputDate}`,
          method: "GET",
          // params: {          
          //   inputDate: arg.inputDate
          // },
        };
      },
      providesTags: [tagTypes.otheradjustment],
    }),

    // get All drop down list
    importLcInformationDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/other-adjust/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.otheradjustment],
    }),

    // Child Drop Down
    importLcInformationChildDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/other-adjust/drop-down-child",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.otheradjustment],
    }),

    // get single VAT Registration Type
    getSingleImportLcInformation: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/other-adjust/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.otheradjustment],
    }),

    // create a new vat reg type
    addImportLcInformation: build.mutation({
      query: (data) => ({
        url: "/commercial/api/v1/other-adjust/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.otheradjustment],
    }),

  }),
});

export const {
  useImportlcinformationQuery,
  useImportLCDateQuery,
  useImportLcInformationDropDownQuery,
  useImportLcInformationChildDropDownQuery,
  useGetSingleImportLcInformationQuery,
  useAddImportLcInformationMutation,

} = importLcInformationApi;
