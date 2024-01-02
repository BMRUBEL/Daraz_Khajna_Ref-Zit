import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const hsCodeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  hs code
    hsCode: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hscode/all",
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
      providesTags: [tagTypes.hscode],
    }),
    // product category name drop down
    productCatName: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/product-category/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.hscode],
    }),

    // get single transaction
    getSingleHsCode: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/hscode/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.hscode],
    }),
    // create a new transaction
    addHsCode: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/hscode/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.hscode],
    }),
    // update ac department
    updateHsCode: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/hscode/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.hscode],
    }),
  }),
});

export const {
  useHsCodeQuery,
  useProductCatNameQuery,
  useGetSingleHsCodeQuery,
  useAddHsCodeMutation,
  useUpdateHsCodeMutation,
} = hsCodeApi;
