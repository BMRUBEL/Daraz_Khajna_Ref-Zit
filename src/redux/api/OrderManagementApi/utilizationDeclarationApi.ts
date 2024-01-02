import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const utilizationDeclarationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Utilization Declaration
    utilizationDeclar: build.query({
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

    exportLcdate: build.query({
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
    customerNameDropDown: build.query({
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

    // get single Utilization Declaration
    getSingleUtilizationDeclar: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/treasury/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.treasurychallan],
    }),

    // create a new Utilization Declaration
    addUtilizationDeclar: build.mutation({
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
  useUtilizationDeclarQuery,
  useExportLcdateQuery,
  useGetSingleBankQuery,
  useCustomerNameDropDownQuery,
  useGetVatCodeDetailQuery,
  useGetSingleUtilizationDeclarQuery,
  useAddUtilizationDeclarMutation,
} = utilizationDeclarationApi;
