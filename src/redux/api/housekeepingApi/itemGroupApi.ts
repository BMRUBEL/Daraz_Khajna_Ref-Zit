import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const itemGroupApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  item group
    itemGroup: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/item-group/all",
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
      providesTags: [tagTypes.itemmaster],
    }),
    // item grop dropdown
    itemgroupdropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/item-group/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.itemmaster],
    }),

    // get single item group
    getSingleItemGroup: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/item-group/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.itemmaster],
    }),
    // create a new itemmaster
    addItmeGroup: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/item-group/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.itemmaster],
    }),
    // update ac department
    updateItemGroup: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/item-group/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.itemmaster],
    }),
  }),
});

export const {
  useItemGroupQuery,
  useItemgroupdropdownQuery,
  useGetSingleItemGroupQuery,
  useAddItmeGroupMutation,
  useUpdateItemGroupMutation,
} = itemGroupApi;
