import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const storeRoleMappingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  transactions
    storemapping: build.query({
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
    // transAllsourceType
    storemappingdropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/tran-source-type/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.transaction],
    }),

    // get single transaction
    getSingleStoreMapping: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    // create a new transaction
    addStoreMapping: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    // update ac department
    updateStoreMapping: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/tran-type/update`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
  }),
});

export const {
  useStoremappingQuery,
  useStoremappingdropdownQuery,
  useGetSingleStoreMappingQuery,
  useAddStoreMappingMutation,
  useUpdateStoreMappingMutation
} = storeRoleMappingApi;
