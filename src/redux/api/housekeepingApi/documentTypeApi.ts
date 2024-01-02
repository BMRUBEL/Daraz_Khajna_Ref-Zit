import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const documentTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  documenttype
    documenttype: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/document/all",
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
      providesTags: [tagTypes.documenttype],
    }),

    // get single documenttype
    getSingleDocumentType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/document/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.documenttype],
    }),
    // create a new businessinformation
    addDocumentType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/document/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.documenttype],
    }),
    // update documenttype
    updateDocumentType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/document/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.documenttype],
    }),
  }),
});

export const {
  useDocumenttypeQuery,
  useGetSingleDocumentTypeQuery,
  useAddDocumentTypeMutation,
  useUpdateDocumentTypeMutation
} = documentTypeApi;
