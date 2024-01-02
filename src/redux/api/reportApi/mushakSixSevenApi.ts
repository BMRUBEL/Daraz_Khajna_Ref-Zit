import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakSixSevenApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakSixSeven: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-seven/grid-data`,
        method: "GET",
        params: { 
            companyId:arg.companyId,
            branchId:arg.branchId,
            storeId:arg.storeId,
            vatMonthId:arg.vatMonthId,
            creditNoteId:arg.creditNoteId,
           
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
   // company drop down
   sixSevenCompDropdown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/report/api/v1/mushak-six-seven/com-dropdown",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.transaction],
  }),

     // branch drop down
     sixSevenBranchDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-seven/brns-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

        // store drop down
    sixSevenStoreDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-seven/store-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

    // vat month drop down
   sixSevenVatDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-seven/vat-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // transfer drop down
   sixSevenCreditDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-seven/crnid-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
  }),
});


export const {
  useMushakSixSevenQuery,
  useSixSevenCompDropdownQuery,
  useSixSevenBranchDropdownQuery,
  useSixSevenStoreDropdownQuery,
  useSixSevenVatDropdownQuery,
  useSixSevenCreditDropdownQuery,
} = mushakSixSevenApi;



