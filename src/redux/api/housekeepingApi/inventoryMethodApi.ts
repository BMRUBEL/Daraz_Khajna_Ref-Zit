import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const inventoryMethodApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  inventorymethod
inventorymethods: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/inventory-method/all",
          method: "GET",
          params: {
            pageNo: arg.page,
            pageSize: arg.size,
            filter: arg.filter || '',
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.inventorymethod],
    }),
    //inventorymethod
    transsourctype: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/inventory-method/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.inventorymethod],
    }),

    // get single inventorymethod
    getSingleInventorymethod: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/inventory-method/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.inventorymethod],
    }),
    // create a new inventorymethod
    addInventorymethod: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/inventory-method/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.inventorymethod],
    }),
    // update inventorymethod
    updateInventorymethod: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/inventory-method/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.inventorymethod],
    }),
  }),
});

export const {
  useInventorymethodsQuery,
  useTranssourctypeQuery,
  useGetSingleInventorymethodQuery,
  useAddInventorymethodMutation,
  useUpdateInventorymethodMutation
} = inventoryMethodApi;
