import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakSixSixApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakSixSix: build.query({
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
   sixSixCompDropdown: build.query({
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
     sixSixBranchDropdown: build.query({
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
    sixSixStoreDropdown: build.query({
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
   sixSixVatDropdown: build.query({
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
   sixSixTransDropdown: build.query({
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
  useMushakSixSixQuery,
  useSixSixCompDropdownQuery,
  useSixSixBranchDropdownQuery,
  useSixSixStoreDropdownQuery,
  useSixSixVatDropdownQuery,
  useSixSixTransDropdownQuery,
  
} = mushakSixSixApi;



