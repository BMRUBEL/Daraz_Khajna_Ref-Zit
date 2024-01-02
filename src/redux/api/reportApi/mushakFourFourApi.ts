import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakFourFourApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.5
    mushakFourFour: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-four-three/grid-data`,
        method: "GET",
        params: { 
          companyId: arg.companyId,
          branchId: arg.branchId,
          storeId: arg.storeId,
          vatMonthId: arg.vatMonthId,
          pageNo: arg.page,
          pageSize: arg.size,
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
 
    // company drop down
    companyFourFourDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-four-three/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
   
    // company branch drop down
    branchFourFourDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-four-three/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // store drop down
    storeFourFourDropdown: build.query({
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
    vatMonthFourFourDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-four-three/dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
 
  }),
});


export const {
 useMushakFourFourQuery,
 useCompanyFourFourDropdownQuery,
 useBranchFourFourDropdownQuery,
 useStoreFourFourDropdownQuery,
 useVatMonthFourFourDropdownQuery,
} = mushakFourFourApi;



