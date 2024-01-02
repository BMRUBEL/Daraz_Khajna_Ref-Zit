import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const languagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  languages
    languages: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/language/all",
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
      providesTags: [tagTypes.languages],
    }),
   

    // get single languages
    getSingleLanguage: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/language/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.languages],
    }),
    // create a new languages
    addLanguage: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/language/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.languages],
    }),
    // update languages
    updateLanguage: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/language/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.languages],
    }),
  }),
});

export const {
  useLanguagesQuery,
  useGetSingleLanguageQuery,
  useAddLanguageMutation,
  useUpdateLanguageMutation
} = languagesApi;
