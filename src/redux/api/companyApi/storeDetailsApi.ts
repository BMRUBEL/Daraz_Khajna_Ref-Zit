import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const storeDetailsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Store Details
    storedetails: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-store/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          }
        };
      },
      providesTags: [tagTypes.customersetup],
    }),

    //Store Details drop down
    storeDetailsDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-store/basic-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customersetup],
    }),

    // get single Store Details
    getSingleStoreDetails: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company-store/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customersetup],
    }),

    // create a new Store Details
    addStoreDetails: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company-store/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
    // update a single Store Details
    updateStoreDetails: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company-store/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
  }),
});

export const {
  useStoredetailsQuery,
  useStoreDetailsDropDownQuery,
  useGetSingleStoreDetailsQuery,
  useAddStoreDetailsMutation,
  useUpdateStoreDetailsMutation,
} = storeDetailsApi;
