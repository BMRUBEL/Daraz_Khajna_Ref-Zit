import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakSixFiveApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakSixFive: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-five/grid-data`,
        method: "GET",
        params: { 
            companyId:arg.companyId,
            branchId:arg.branchId,
            storeId:arg.storeId,
            vatMonthId:arg.vatMonthId,
            transferMasterId:arg.transferId,
            pageNo: arg.page,
            pageSize: arg.size,
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
    
   // company drop down
   sixFiveCompDropdown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/report/api/v1/mushak-six-five/com-dropdown",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.transaction],
  }),

     // branch drop down
     sixFiveBranchDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-five/brns-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

        // store drop down
    sixFiveStoreDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-five/store-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

    // vat month drop down
   sixFiveVatDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-five/vat-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // transfer drop down
   sixFiveTransDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-five/trns-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
 
  
    // get single transaction
    getSingleVatMonthInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/report/api/v1/vatmonth-info/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
  }),
});


export const {
  useMushakSixFiveQuery,
  useSixFiveCompDropdownQuery,
  useSixFiveBranchDropdownQuery,
  useSixFiveStoreDropdownQuery,
  useSixFiveVatDropdownQuery,
  useSixFiveTransDropdownQuery,
  
} = mushakSixFiveApi;



