import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakFourFiveApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.5
    mushakFourFive: build.query({
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
    companyFourFiveDropdown: build.query({
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
    branchFourFiveDropdown: build.query({
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
    storeFourFiveDropdown: build.query({
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
    vatMonthFourFiveDropdown: build.query({
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
 useMushakFourFiveQuery,
 useCompanyFourFiveDropdownQuery,
 useBranchFourFiveDropdownQuery,
 useStoreFourFiveDropdownQuery,
 useVatMonthFourFiveDropdownQuery,
} = mushakFourFiveApi;



