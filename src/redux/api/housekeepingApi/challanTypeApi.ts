import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const challanTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  challantype
    challantype: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/challan-type/all",
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
      providesTags: [tagTypes.challantype],
    }),
  

    // get single challantype
    getSingleChallanType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/challan-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.challantype],
    }),
    // create a new challan type
    addChallanType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/challan-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.challantype],
    }),
    // update ac department
    updateChallanType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/challan-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.challantype],
    }),
  }),
});

export const {
  useChallantypeQuery,
  useGetSingleChallanTypeQuery,
  useAddChallanTypeMutation,
  useUpdateChallanTypeMutation,
} = challanTypeApi;
