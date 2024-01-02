import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const companyTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  companytype
    companytype: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-type/all",
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
      providesTags: [tagTypes.companytype],
    }),
   
    // get single companytype
    getSingleCompanyType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companytype],
    }),
    // create a new companytype
    addCompanyType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.companytype],
    }),
    // update companytype
    updateCompanyType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.companytype],
    }),
  }),
});

export const {
  useCompanytypeQuery,
  useGetSingleCompanyTypeQuery,
  useAddCompanyTypeMutation,
  useUpdateCompanyTypeMutation
} = companyTypeApi;
