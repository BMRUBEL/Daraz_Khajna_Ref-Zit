import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const designationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Designation
    designation: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-designation/all",
          method: "GET",
          params: {  pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection },
        };
      },
      providesTags: [tagTypes.customersetup],
    }),


    // get single Designation
    getSingleDesignation: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company-designation/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customersetup],
    }),

    // create a new Designation
    addDesignation: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company-designation/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
    // update a single Designation
    updateDesignation: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company-designation/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
  }),
});

export const {
  useDesignationQuery,
  useGetSingleDesignationQuery,
  useAddDesignationMutation,
  useUpdateDesignationMutation,
} = designationApi;
