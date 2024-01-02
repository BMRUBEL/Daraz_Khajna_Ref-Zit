import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const supplierInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all supplier Info
    getAllSupplierInfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/customer/all",
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
      providesTags: [tagTypes.supplierinfo],
    }),

    //Bank Branch From Bank

    getSingleBank: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/bank-info/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.supplierinfo],
    }),

    //Division from country

    getSingleDivision: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/country/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.supplierinfo],
    }),

    //District from division

    getSingleDistrict: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/division/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.supplierinfo],
    }),

    //Upazila  and Police Station from district

    getSingleUpazila: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/district/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.supplierinfo],
    }),

    //supplier Info drop down
    getSupplierSetupDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/customer/customer-basic-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.supplierinfo],
    }),

    // get single supplier Info
    getSingleSupplierSetup: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/customer/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.supplierinfo],
    }),

    // create a new supplier Info
    addSupplierSetup: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/customer/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.supplierinfo],
    }),
    // update a single supplier Info
    updateSupplierSetup: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/customer/update${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.supplierinfo],
    }),
  }),
});

export const {
useGetAllSupplierInfoQuery,
useGetSingleBankQuery,
useGetSingleDistrictQuery,
useGetSingleDivisionQuery,
useGetSingleSupplierSetupQuery,
useGetSingleUpazilaQuery,
useAddSupplierSetupMutation,
useUpdateSupplierSetupMutation,
useGetSupplierSetupDropDownQuery

} = supplierInfoApi;
