import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const debitNoteforApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  debitnotefor
    debitnotes: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/debit-note-for/all",
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
      providesTags: [tagTypes.debitnotefor],
    }),
    // transAllsourceType
    debitnotedropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/debit-note-for/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.debitnotefor],
    }),

    // get single debitnotefor
    getSingleDebitnote: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/debit-note-for/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.debitnotefor],
    }),
    // create a new debitnotefor
    addDebitNote: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/debit-note-for/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.debitnotefor],
    }),
    // update debitnotefor
    updateDebitNote: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/debit-note-for/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.debitnotefor],
    }),
  }),
});

export const {
  useDebitnotesQuery,
  useDebitnotedropdownQuery,
  useGetSingleDebitnoteQuery,
  useAddDebitNoteMutation,
  useUpdateDebitNoteMutation
} = debitNoteforApi;
