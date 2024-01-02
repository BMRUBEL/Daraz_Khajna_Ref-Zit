import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const itemSubGroupApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  item sub group
    itemSubGroup: build.query({
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
    // item sub group dropdown
    itemSubgroupDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-type/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),

    // get single item sub group
    getSingleItemSubgroup: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    // create a new item sub group
    addItemSubgroup: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    // update ac department
    updateItemSubgroup: build.mutation({
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
  useItemSubGroupQuery,
  useItemSubgroupDropdownQuery,
  useGetSingleItemSubgroupQuery,
  useAddItemSubgroupMutation,
  useUpdateItemSubgroupMutation,
} = itemSubGroupApi;
