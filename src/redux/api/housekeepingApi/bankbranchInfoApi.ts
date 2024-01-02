import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const bankbranchInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  bankbranchinfo
    bankbranches: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/bank-branch-info/all",
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
      providesTags: [tagTypes.bankbranch],
    }),
    // transAllsourceType
    bankbranchDropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/bank-branch-info/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.bankbranch],
    }),

    // get single bankbranchinfo
    getSingleBankBranch: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/bank-branch-info/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bankbranch],
    }),
    // create a new bankbranchInfo
    addBankBranch: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/bank-branch-info/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bankbranch],
    }),
    // update bankbranchinfo
    updateBankbranch: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/bank-branch-info/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.bankbranch],
    }),
  }),
});

export const {
  useBankbranchesQuery,
  useBankbranchDropdownQuery,
  useGetSingleBankBranchQuery,
  useAddBankBranchMutation,
  useUpdateBankbranchMutation
} = bankbranchInfoApi;
