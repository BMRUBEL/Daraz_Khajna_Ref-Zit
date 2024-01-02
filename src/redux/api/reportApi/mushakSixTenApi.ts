import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const mushakSixTenApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakSixTen: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-ten/grid-data`,
        method: "GET",
        params: { 
            companyId:arg.companyId,
            branchId:arg.branchId,
            storeId:arg.storeId,
            vatMonthId:arg.vatMonthId,
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
   // company drop down
   sixTenCompDropdown: build.query({
    query: (arg: Record<string, any>) => {
      return {
        url: "/report/api/v1/mushak-six-ten/com-dropdown",
        method: "GET",
        params: arg,
      };
    },
    providesTags: [tagTypes.transaction],
  }),

     // branch drop down
     sixTenBranchDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-ten/brns-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

        // store drop down
    sixTenStoreDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-ten/store-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),

    // vat month drop down
   sixTenVatDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-ten/vat-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
  }),
});

export const {
  useMushakSixTenQuery,
  useSixTenCompDropdownQuery,
  useSixTenBranchDropdownQuery,
  useSixTenStoreDropdownQuery,
  useSixTenVatDropdownQuery,
} = mushakSixTenApi;



