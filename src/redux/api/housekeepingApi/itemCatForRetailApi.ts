import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const itemCatForRetailApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Item Cat for retail
    itemcategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/item-cat-retail/all",
          method: "GET",
          params: { pageNo: arg.page, pageSize: arg.size, filter: arg.filter, dbFieldName: arg.sortField, sortDirection: arg.sortDirection },
          
        };
      },
      providesTags: [tagTypes.itemcategory],
    }),

    // get single itemcategory
    getSingleitemcategory: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/item-cat-retail/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.itemcategory],
    }),
    // create a new itemcategory
    additemcategory: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/item-cat-retail/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.itemcategory],
    }),
    // update ac department
    updateitemcategory: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/item-cat-retail/update/${data.id}`,
        method: "PUT",
     data:data?.body,
      }),
      invalidatesTags: [tagTypes.itemcategory],
    }),
  }),
});

export const {
  useItemcategoryQuery,
  useGetSingleitemcategoryQuery,
  useAdditemcategoryMutation,
  useUpdateitemcategoryMutation,
} = itemCatForRetailApi;
