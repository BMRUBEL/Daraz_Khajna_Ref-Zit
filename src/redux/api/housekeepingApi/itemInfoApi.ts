import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const itemInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Item Info
    itemInfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-type/all",
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
      providesTags: [tagTypes.transaction],
    }),
    // Item info Drop down
    itemInfoDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-type/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),

    // get single Item info
    getSingleItemInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    // create a new Item Info
    addItemInfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    // update ac department
    updateItemInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/tran-type/update/${data.id}`,
        method: "PUT",
        data: JSON.stringify({
          trnsSourceTypeId: `${data.body.trnsSourceTypeId}`,
          trnsTypeName: `${data.body.trnsTypeName}`,
          trnsTypeNameBn: `${data.body.trnsTypeNameBn}`,
          seqNo: `${data.body.seqNo}`,
          active: `${data.body.active}`,
        }),
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
  }),
});

export const {
  useItemInfoQuery,
  useItemInfoDropdownQuery,
  useGetSingleItemInfoQuery,
  useAddItemInfoMutation,
  useUpdateItemInfoMutation,
} = itemInfoApi;
