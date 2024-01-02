import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const treasuryChallanApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Treasury Challan
    treasuryChallan: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/treasury/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 1,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.treasurychallan],
    }),

    vatMonth: build.query({
      query: (inputDate: Record<string, any>) => {
        return {
          url: `/setting/api/v1/commercial/fiscalYearVatMonthFromInputDate?inputDate=${inputDate}`,
          method: "GET",
          // params: {          
          //   inputDate: arg.inputDate
          // },
        };
      },
      providesTags: [tagTypes.treasurychallan],
    }),

    // get All drop down list
    treasuryChallanDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/treasury/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.treasurychallan],
    }),

    //Bank Branch from Bank

    getSingleBank: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/bank-info/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.treasurychallan],
    }),

    //Vat Code Detail

    getVatCodeDetail: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/tran-acc-item/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.treasurychallan],
    }),

    // get single Treasury Challan
    getSingleTreasuryChallan: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/treasury/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.treasurychallan],
    }),

    // create a new Treasury Challan
    addTreasuryChallan: build.mutation({
      query: (data) => ({
        url: "/commercial/api/v1/treasury/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.treasurychallan],
    }),
  }),
});

export const {
  useTreasuryChallanQuery,
  useVatMonthQuery,
  useGetSingleBankQuery,
  useTreasuryChallanDropDownQuery,
  useGetVatCodeDetailQuery,
  useGetSingleTreasuryChallanQuery,
  useAddTreasuryChallanMutation,
} = treasuryChallanApi;
