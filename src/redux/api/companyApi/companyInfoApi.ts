import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const companyInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Company Info
    companyInfo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company/all",
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
      providesTags: [tagTypes.companyinfo],
    }),

     //Company Info drop down
     companyInfoDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.companyinfo],
    }),

    // get single Company Info
    getSingleCompanyInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyinfo],
    }),

    // create a new Company Info
    addCompanyInfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.companyinfo],
    }),
    // updatea single Company Info
    updateCompanyInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.companyinfo],
    }),
  }),
});

export const {
  useCompanyInfoQuery,
  useCompanyInfoDropDownQuery,
  useGetSingleCompanyInfoQuery,
  useAddCompanyInfoMutation,
  useUpdateCompanyInfoMutation
} = companyInfoApi;
