import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const itemMaster = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Master Group
    mastergroup: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/item-master-group/all",
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


    // get single Master Group
    getSingleMasterGroup: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/item-master-group/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.itemmaster],
    }),

    //Master Group drop down
    masterGroupDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/item-master-group/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.itemmaster],
    }),

    // create a new Master Group
    addMasterGroup: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/item-master-group/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.itemmaster],
    }),
    // update a single Master Group
    updateMasterGroup: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/item-master-group/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.itemmaster],
    }),
  }),
});

export const {
  useMastergroupQuery,
  useGetSingleMasterGroupQuery,
  useMasterGroupDropDownQuery,
  useAddMasterGroupMutation,
  useUpdateMasterGroupMutation,
} = itemMaster;
