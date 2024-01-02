import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const mushakNineOneApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
 

    // company drop down
    companyNineOneDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-nine-one/com-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
   
    // company branch drop down
    branchNineOneDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-nine-one/brns-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
 
    // vat month drop down
    vatMonthNineOneDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/report/api/v1/mushak-nine-one/vat-dropdown",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),
 
  }),
});


export const {

 useCompanyNineOneDropdownQuery,
 useBranchNineOneDropdownQuery,
 useVatMonthNineOneDropdownQuery,
} = mushakNineOneApi;



