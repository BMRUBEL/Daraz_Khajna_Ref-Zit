import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakFourThreeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakFourThree: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-four-three/grid-data`,
        method: "GET",
        params: { 
          priceDecId:arg.priceDecId,
          pageNo: arg.page,
          pageSize: arg.size,
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
 
    // vat month drop down
    companyFourThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-four-three/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
   
    // vat month drop down
    branchFourThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-four-three/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat month drop down
    storeFourThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/company-store-name/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat month drop down
    vatMonthFourThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-four-three/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat month drop down
    issueMasterFourThreeDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/company-store-name/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
 
  }),
});


export const {
  useMushakFourThreeQuery,
 useCompanyFourThreeDropdownQuery,
 useBranchFourThreeDropdownQuery,
 useStoreFourThreeDropdownQuery,
 useVatMonthFourThreeDropdownQuery,
 useIssueMasterFourThreeDropdownQuery
  
} = mushakFourThreeApi;



