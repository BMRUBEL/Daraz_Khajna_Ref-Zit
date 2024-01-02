import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const mushakSixEightApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakSixEight: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-eight/grid-data`,
        method: "GET",
        params: { 
            companyId:arg.companyId,
            branchId:arg.branchId,
            storeId:arg.storeId,
            vatMonthId:arg.vatMonthId,
            supplierId:arg.supplierId,
            debitNoteId: arg.debitNoteId,
            
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
   // company drop down
   sixEightCompDropdown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/report/api/v1/mushak-six-eight/com-dropdown",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.transaction],
  }),

     // branch drop down
     sixEightBranchDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-eight/brns-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

        // store drop down
    sixEightStoreDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-eight/store-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

    // vat month drop down
   sixEightVatDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-eight/vat-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // Supplier drop down
   sixEightSupDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-eight/sup-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // transfer drop down
   sixEightDebitDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-eight/dnid-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
 
  
   
  }),
});


export const {
  useMushakSixEightQuery,
  useSixEightCompDropdownQuery,
  useSixEightBranchDropdownQuery,
  useSixEightStoreDropdownQuery,
  useSixEightVatDropdownQuery,
  useSixEightSupDropdownQuery,
  useSixEightDebitDropdownQuery
  
} = mushakSixEightApi;



