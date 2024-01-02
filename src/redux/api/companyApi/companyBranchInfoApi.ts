import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const companyBranchInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Company Branch Info
    companyBranchInfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-branch/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.companybranchinfo],
    }),

     // Company Branch Info Drop Down
     companyBranchInfoDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-branch/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.companybranchinfo],
    }),

    //Bank Branch from Bank

    getSingleBank: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/bank-info/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customersetup],
    }),

    //Division from country

    getSingleDivision: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/country/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customersetup],
    }),

    //District from division

    getSingleDistrict: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/division/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customersetup],
    }),

    //Upazila  and Police Station from district

    getSingleUpazila: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/district/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customersetup],
    }),


    // get single Company Branch Info
    getSingleCompanyBranchInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company-branch/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companybranchinfo],
    }),

    // create a new supplier info
    addCompanyBranchInfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company-branch/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.companybranchinfo],
    }),
    // update single item
    updateCompanyBranchInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company-branch/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.companybranchinfo],
    }),
  }),
});

export const {
  useCompanyBranchInfoQuery,
  useCompanyBranchInfoDropDownQuery,
  useGetSingleCompanyBranchInfoQuery,
  useAddCompanyBranchInfoMutation,
  useUpdateCompanyBranchInfoMutation,
  useGetSingleBankQuery,
  useGetSingleDistrictQuery,
  useGetSingleDivisionQuery,
  useGetSingleUpazilaQuery,
  
} = companyBranchInfoApi;
