import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const importLcPurposeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  importlcpurpose
    importlcpurposes: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/import-lc-purpose/all",
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
      providesTags: [tagTypes.importlcpurpose],
    }),
    
    // get single importlcpurpose
    getSingleImportLcPurpose: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/import-lc-purpose/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.importlcpurpose],
    }),
    // create a new importlcpurpose
    addImportlcpurpose: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/import-lc-purpose/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.importlcpurpose],
    }),
    // update importlcpurpose
    updateImportLcpurpose: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/import-lc-purpose/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.importlcpurpose],
    }),
  }),
});

export const {
  useImportlcpurposesQuery,
  useGetSingleImportLcPurposeQuery,
  useAddImportlcpurposeMutation,
  useUpdateImportLcpurposeMutation
} = importLcPurposeApi;
