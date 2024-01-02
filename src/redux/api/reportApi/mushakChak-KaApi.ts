import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakChakKaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Mushak 4.3
    mushakChakKa: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/report/api/v1/mushak-six-five/grid-data`,
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
   // company drop down
   chakKaCompDropdown: build.query({
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
     chakKaBranchDropdown: build.query({
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
     chakKaStoreDropdown: build.query({
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
    chakKaVatDropdown: build.query({
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
    chakKaFromDate: build.query({
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
     chakKaToDate: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/report/api/v1/vatmonth-info/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
  }),
});


export const {
  useMushakChakKaQuery,
  useChakKaCompDropdownQuery,
  useChakKaBranchDropdownQuery,
  useChakKaStoreDropdownQuery,
  useChakKaVatDropdownQuery,
  useChakKaFromDateQuery,
  useChakKaToDateQuery,
  
} = mushakChakKaApi;



