import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const sectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Section
    section: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-section/all",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          },
        };
      },
      providesTags: [tagTypes.customersetup],
    }),


    // get single Section
    getSingleSection: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company-section/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customersetup],
    }),

    //Section drop down
    sectionDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-department/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customersetup],
    }),

    // create a new Section
    addSection: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company-section/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
    // update a single Section
    updateSection: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company-section/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
  }),
});

export const {
  useSectionQuery,
  useGetSingleSectionQuery,
  useSectionDropDownQuery,
  useAddSectionMutation,
  useUpdateSectionMutation,
} = sectionApi;
