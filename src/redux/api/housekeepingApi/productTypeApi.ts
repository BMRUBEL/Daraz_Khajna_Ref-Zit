import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const productTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all product type
    productType: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/product-type/all",
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
      providesTags: [tagTypes.producttype],
    }),
    // product drop down
    productTypeDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/product-category/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.producttype],
    }),

    // get single product type
    getSingleProductType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/product-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.producttype],
    }),
    // create a new product type
    addProductType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/product-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.producttype],
    }),
    // update a single product type
    updateProductType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/product-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.producttype],
    }),
  }),
});

export const {
  useProductTypeQuery,
  useProductTypeDropDownQuery,
  useGetSingleProductTypeQuery,
  useAddProductTypeMutation,
  useUpdateProductTypeMutation,
} = productTypeApi;
