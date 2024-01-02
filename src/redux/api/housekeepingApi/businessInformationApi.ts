import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const businessInformationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  businessinformation
    businessinformation: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/business/all",
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
      providesTags: [tagTypes.businessinformation],
    }),
    // businessinformation All
    businessdropdown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/business/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.businessinformation],
    }),

    // get single businessinformation
    getSingleBusinessInfo: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/business/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.businessinformation],
    }),
    // create a new businessinformation
    addBusinessInfo: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/business/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.businessinformation],
    }),
    // update businessinformation
    updateBusinessInfo: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/business/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.businessinformation],
    }),
  }),
});

export const {
  useBusinessinformationQuery,
  useBusinessdropdownQuery,
  useGetSingleBusinessInfoQuery,
  useAddBusinessInfoMutation,
  useUpdateBusinessInfoMutation
} = businessInformationApi;
