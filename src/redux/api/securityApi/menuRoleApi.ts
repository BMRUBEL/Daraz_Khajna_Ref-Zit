import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const menuRoleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  Role Menu
    rolemenus: build.query({
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
      providesTags: [tagTypes.rolemenus],
    }),
    

    // get single Role Menu
    getSingleRolemenu: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.rolemenus],
    }),
    // create a new Role Menu
    addRolemenu: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.rolemenus],
    }),
    // update ac Role Menu
    updateRolemenu: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/tran-type/update`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.rolemenus],
    }),
  }),
});

export const {
  useRolemenusQuery,
  useGetSingleRolemenuQuery,
  useAddRolemenuMutation,
  useUpdateRolemenuMutation
} = menuRoleApi;
