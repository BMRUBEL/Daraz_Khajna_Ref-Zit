import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const MushakSixTwoOneApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 6.2.1
    mushakSixTwoOne: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-two-one/grid-datas`,
        method: "GET",
        params: { 
          companyId:arg.companyId,
          branchId:arg.branchId,
          vatMonthId:arg.vatMonthId,
          storeId:arg.storeId,
          pageNo: arg.page,
          pageSize: arg.size,
          }
      }),
      providesTags: [tagTypes.transaction],
    }),

    // company drop down
   sixTwoOneCompDropdown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/report/api/v1/mushak-six-two-one/com-dropdown",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.transaction],
  }),

     // branch drop down
     sixTwoOneBranchDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-two-one/brns-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

        // store drop down
    sixTwoOneStoreDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-two-one/stores-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

    // vat month drop down
   sixTwoOneVatDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-two-one/vatmonth-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
   
  }),
});


export const {
 useMushakSixTwoOneQuery,
 useSixTwoOneCompDropdownQuery,
 useSixTwoOneBranchDropdownQuery,
 useSixTwoOneStoreDropdownQuery,
 useSixTwoOneVatDropdownQuery
} = MushakSixTwoOneApi;



