import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const duePenaltySerchargeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Due Penalty Sercharge
    duePenaltySercharge: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/commercial/api/v1/due-penalty/all",
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
      providesTags: [tagTypes.duepenaltysercharge],
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
      providesTags: [tagTypes.duepenaltysercharge],
    }),

    // get single Due Penalty Sercharge
    getSingleDuePenaltySercharge: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/commercial/api/v1/due-penalty/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.duepenaltysercharge],
    }),

    // create a new Due Penalty Sercharge
    addDuePenaltySercharge: build.mutation({
      query: (data) => ({
        url: "/commercial/api/v1/due-penalty/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.duepenaltysercharge],
    }),
   
  }),
});

export const {
  useDuePenaltySerchargeQuery,
  useVatMonthQuery,
  useGetSingleDuePenaltySerchargeQuery,
  useAddDuePenaltySerchargeMutation,

} = duePenaltySerchargeApi;
