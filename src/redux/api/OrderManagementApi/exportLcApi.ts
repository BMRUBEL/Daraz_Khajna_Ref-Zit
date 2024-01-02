import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const receiveApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // get all receive data
    getAllReceive: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/inventory/api/v1/local-purchase/list",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 1,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          }
        };
      },
      providesTags: [tagTypes.receive],
    }),

    // master Drop down data
    masterDropDownData: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/inventory/api/v1/local-purchase/hk",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.receive],
    }),


    // get all child item
    childItem: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/inventory/api/v1/common/item-with-vat-structure?tranSubTypeId=4&fiscalYearId=1&hsCodeId=1&effectiveDate=2023-10-29",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.receive],
    }),

  

    // get single receive data
    getSingleReceive: build.query({
      query: (recvMasterId: string | string[] | undefined) => ({
        url: `/inventory/api/v1/local-purchase/find/${recvMasterId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.receive],
    }),


    // create a new receive
    addReceivTransaction: build.mutation({
      query: (data) => ({
        url: "/inventory/api/v1/local-purchase/insert",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.receive],
    }),

    // update ac department
    // updateBankinfo: build.mutation({
    //   query: (data) => ({
    //     url: `/tran-type/update/${data.id}`,
    //     method: "PUT",
    //     data: JSON.stringify({
    //       id: `${data.body.id}`,
    //       trnsTypeName: `${data.body.trnsTypeName}`,
    //       trnsTypeNameBn: `${data.body.trnsTypeNameBn}`,
    //       seqNo: data.result?.seqNo,
    //       active: `${data.body.active}`,
    //     }),
    //   }),
    //   invalidatesTags: [tagTypes.transaction],
    // }),
  }),
});

export const {
  useGetAllReceiveQuery, 
  useMasterDropDownDataQuery,// get master drow down options
  useChildItemQuery, // get child item
  useGetSingleReceiveQuery, // get single item
  useAddReceivTransactionMutation,
  // useUpdateBankinfoMutation,
} = receiveApi;
