import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const menusApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  transactions
    menus: build.query({
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
    menusDropdown: build.query({
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
    getSingleMenus: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/tran-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    // create a new transaction
    addMenus: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/tran-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    // update ac department
    updateMenus: build.mutation({
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
  useMenusQuery,
  useMenusDropdownQuery,
  useGetSingleMenusQuery,
  useAddMenusMutation,
  useUpdateMenusMutation,
} = menusApi;
