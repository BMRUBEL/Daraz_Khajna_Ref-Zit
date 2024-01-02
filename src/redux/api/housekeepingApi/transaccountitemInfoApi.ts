import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const transaccountitemInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  accountiteminfo
    accountitems: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-acc-item/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          }
        };
      },
      providesTags: [tagTypes.accountiteminfo],
    }),

    // get single accountiteminfo
    getSingleAccountitem: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-acc-item/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.accountiteminfo],
    }),
    // create a new accountiteminfo
    addAccountItem: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-acc-item/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.accountiteminfo],
    }),
    // update accountiteminfo
    updateAccountItem: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/tran-acc-item/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.accountiteminfo],
    }),
  }),
});

export const {
  useAccountitemsQuery,
  useGetSingleAccountitemQuery,
  useAddAccountItemMutation,
  useUpdateAccountItemMutation,
} = transaccountitemInfoApi;
