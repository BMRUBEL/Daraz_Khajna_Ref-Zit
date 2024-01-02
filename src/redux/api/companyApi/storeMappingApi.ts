import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const storeMappingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Store Mapping
    getAllStorMapping: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/user-company-store-mapping/all?pageNo=&pageSize=&sortField=&sortDirection=&filter=",
          method: "GET",
          // params: { pageNo: 1, pageSize: 20, filter: "",dbFieldName:"id",sortDirection:'ASC' },
        };
      },
      providesTags: [tagTypes.sotemapping],
    }),

    //Store Details drop down
    storeDetailsDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/inventory/api/v1/common/item-with-vat-structure?tranSubTypeId=4&fiscalYearId=1&hsCodeId=1&effectiveDate=2023-10-29",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.sotemapping],
    }),

    // get single Store Details
    getSingleStoreDetails: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/inventory/api/v1/local-purchase/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sotemapping],
    }),

    // create a new Store Details
    addStoreDetails: build.mutation({
      query: (data) => ({
        url: "/inventory/api/v1/local-purchase/insert",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.sotemapping],
    }),
    // update a single Store Details
    updateStoreDetails: build.mutation({
      query: (data) => ({
        url: `/inventory/api/v1/local-purchase/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.sotemapping],
    }),
  }),
});

export const {
  useGetAllStorMappingQuery,
} = storeMappingApi;
