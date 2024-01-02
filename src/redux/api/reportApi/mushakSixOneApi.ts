import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakSixOne = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 6.1
    mushakSixOne: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-one/grid-datas`,
        method: "GET",
        params: { 
          companyId:arg.companyId,
          branchId:arg.branchId,
          storeId:arg.storeId,
          vatMonthId:arg.vatMonthId,
          pageNo: arg.page,
          pageSize: arg.size,
          }
      }),
      providesTags: [tagTypes.transaction],
    }),
    // vat Company drop down
    sixOneCompDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-one/com-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat Company Branch drop down
    sixOneBranchDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-one/brns-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat month drop down
    sixOneMonthDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-one/vat-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
    // vat Store drop down
    sixOneStoreDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-one/store-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
  
  }),
});


export const {
  useMushakSixOneQuery,
  useSixOneCompDropdownQuery,
  useSixOneBranchDropdownQuery,
  useSixOneMonthDropdownQuery,
  useSixOneStoreDropdownQuery,
} = mushakSixOne;



