import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const productCatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  product category
    productCat: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/product-category/all",
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
      providesTags: [tagTypes.productcat],
    }),

    // get single product category
    getSingleProductCat: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/product-category/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.productcat],
    }),
    // create a new product category
    addProductCat: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/product-category/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.productcat],
    }),
    updateProductCat: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/product-category/update/${data.id}`,
        method: "PUT",
        data:data?.body,
      }),
      invalidatesTags: [tagTypes.productcat],
    }),
  }),
});

export const {
  useProductCatQuery,
  useGetSingleProductCatQuery,
  useAddProductCatMutation,
  useUpdateProductCatMutation,
} = productCatApi;
