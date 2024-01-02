import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const mushakSixTwo = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 6.1
    mushakSixTwo: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-two/grid-datas`,
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

  
    //  store drop down
    sixTwoCompDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-two/com-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
      // vat month drop down
      sixTwoBranchDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-two/brns-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),
    //  store drop down
    sixTwoStoreDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-six-two/stores-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
      // vat month drop down
      sixTwoMonthDropdown: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: "/report/api/v1/mushak-six-two/vat-dropdown",
            method: "GET",
            params: arg,
          };
        },
        providesTags: [tagTypes.transaction],
      }),
  
  }),
});


export const {
  useMushakSixTwoQuery,
  useSixTwoCompDropdownQuery,
  useSixTwoBranchDropdownQuery,
  useSixTwoStoreDropdownQuery,
  useSixTwoMonthDropdownQuery,
} = mushakSixTwo;



