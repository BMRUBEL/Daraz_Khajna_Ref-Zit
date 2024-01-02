import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const creditNoteforApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  creditnotefor
    creditnotes: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/credit-note-for/all",
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
      providesTags: [tagTypes.creditnotefor],
    }),
    // transAllsourceType
    creditnotedropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/credit-note-for/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.creditnotefor],
    }),
    // get single creditnotefor
    getSingleCreditnote: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/credit-note-for/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.creditnotefor],
    }),
    // create a new creditnotefor
    addCreditnote: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/credit-note-for/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.creditnotefor],
    }),
    // update creditnotefor
    updateCreditNote: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/credit-note-for/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.creditnotefor],
    }),
  }),
});

export const {
  useCreditnotesQuery,
  useCreditnotedropdownQuery,
  useGetSingleCreditnoteQuery,
  useAddCreditnoteMutation,
  useUpdateCreditNoteMutation
} = creditNoteforApi;
