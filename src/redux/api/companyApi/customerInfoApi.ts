import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const customerInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Customer Info
    customerSetup: build.query({
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
          },
        };
      },
      providesTags: [tagTypes.customersetup],
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

     //Upazila  and Police Station from district

     getSinglePoliceStation: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/district/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customersetup],
    }),
   

    //Customer Info drop down
    customerSetupDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/customer/customer-basic-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customersetup],
    }),

    // get single Customer Info
    getSingleCustomerSetup: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/customer/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customersetup],
    }),

    // create a new Customer Info
    addCustomerSetup: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/customer/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
    // update a single Customer Info
    updateCustomerSetup: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/customer/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
  }),
});

export const {
  useCustomerSetupQuery,
  useGetSingleBankQuery,
  useGetSingleDivisionQuery,
  useGetSingleDistrictQuery,
  useGetSingleUpazilaQuery,
  useGetSingleCustomerSetupQuery,
  useAddCustomerSetupMutation,
  useUpdateCustomerSetupMutation,
  useCustomerSetupDropDownQuery,
  useGetSinglePoliceStationQuery
} = customerInfoApi;
