import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vdsPurchaserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  VDS Purchaser
    vdsPurchase: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/purchase/all",
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
      providesTags: [tagTypes.vdspurchase],
    }),

  // get All drop down list
  vdsPurchaserDropDown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/commercial/api/v1/purchase/drop-down",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.vdspurchase],
  }),

  // get All drop down child list
  vdsPurchaseDropDownChild: build.query({
    query: (id: string | string[] | undefined) => {
      return {
        url: `/commercial/api/v1/purchase/challan-drop-down/${id}`,
        method: "GET",
      };
    },
    providesTags: [tagTypes.vdspurchase],
  }),


  vdsPurchaserDate: build.query({
    query: (inputDate: Record<string, any>) => {
      return {
        url: `/setting/api/v1/commercial/fiscalYearVatMonthFromInputDate?inputDate=${inputDate}`,
        method: "GET",
        // params: {          
        //   inputDate: arg.inputDate
        // },
      };
    },
    providesTags: [tagTypes.vdspurchase],
  }),

    // get single VAT Registration Type
    getSingleVdsPurchase: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/purchase/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vdspurchase],
    }),

    // create a new vat reg type
    addVdsPurchase: build.mutation({
      query: (data) => ({
        url: "/commercial/api/v1/purchase/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vdspurchase],
    }),
   
  }),
});

export const {
  useVdsPurchaseQuery,
  useVdsPurchaserDateQuery,
  useVdsPurchaserDropDownQuery,
  useVdsPurchaseDropDownChildQuery,
  useGetSingleVdsPurchaseQuery,
  useAddVdsPurchaseMutation,
} = vdsPurchaserApi;
