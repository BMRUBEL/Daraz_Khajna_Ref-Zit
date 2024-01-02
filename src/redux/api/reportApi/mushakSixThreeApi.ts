import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakSixThreeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakSixThree: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-three/grid-data`,
        method: "GET",
        params: { 
          companyId:arg.companyId,
          branchId:arg.branchId,
          storeId:arg.storeId,
          vatMonthId:arg.vatMonthId,
          issueMasterId:arg.issueMasterId,
          pageNo: arg.page,
          pageSize: arg.size,
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
   
    // vat month drop down
    compSixThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-three/com-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat month drop down
    branchSixThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-three/brns-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // store drop down
    storeSixThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-three/store-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat month drop down
    vatMonthSixThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-three/vat-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat month drop down
    issueMasterSixThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-three/issumaster-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    
  }),
});


export const {
  useMushakSixThreeQuery,
  useCompSixThreeDropdownQuery,
  useBranchSixThreeDropdownQuery,
  useStoreSixThreeDropdownQuery,
  useVatMonthSixThreeDropdownQuery,
  useIssueMasterSixThreeDropdownQuery
  
} = mushakSixThreeApi;



