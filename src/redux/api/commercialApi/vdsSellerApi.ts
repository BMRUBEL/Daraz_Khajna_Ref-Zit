import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vdsSellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  VDS Seller
    vdsSeller: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/seller/all",
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
      providesTags: [tagTypes.vdsseller],
    }),


    vdsSellerDate: build.query({
      query: (inputDate: Record<string, any>) => {
        return {
          url: `/setting/api/v1/commercial/fiscalYearVatMonthFromInputDate?inputDate=${inputDate}`,
          method: "GET",
          // params: {          
          //   inputDate: arg.inputDate
          // },
        };
      },
      providesTags: [tagTypes.vdsseller],
    }),

  // get All drop down list
  vdsSellerDropDown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/commercial/api/v1/seller/drop-down",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.vdsseller],
  }),

   // get All drop down child list
   vdsSellerDropDownChild: build.query({
    query: (id: string | string[] | undefined) => {
      return {
        url: `/setting/api/v1/customer/find-issued-customer/${id}`,
        method: "GET",
      };
    },
    providesTags: [tagTypes.vdsseller],
  }),

  
    // get single VAT Registration Type
    getSingleVdsSeller: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/seller/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vdsseller],
    }),

    // create a new vat reg type
    addVdsSeller: build.mutation({
      query: (data) => ({
        url: "/commercial/api/v1/seller/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vdsseller],
    }),
   
  }),
});

export const {
  useVdsSellerQuery,
  useVdsSellerDateQuery,
  useVdsSellerDropDownQuery,
  useVdsSellerDropDownChildQuery,
  useGetSingleVdsSellerQuery,
  useAddVdsSellerMutation,
} = vdsSellerApi;
