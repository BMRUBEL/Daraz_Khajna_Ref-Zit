import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vatStructureApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all vat structure
    vatStructure: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-structure/all",
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
      providesTags: [tagTypes.vatstructure],
    }),
    // vat structure drop down
    vatStructureDropDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vat-structure/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.vatstructure],
    }),
    

    // get single vat structure
    getSingleVatStructure: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vat-structure/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vatstructure],
    }),
    // create a new vat structure
    addVatStructure: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vat-structure/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vatstructure],
    }),
    // update ac department
    updateVatStructure: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vat-structure/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.vatstructure],
    }),
  }),
});

export const {
  useVatStructureQuery,
  useVatStructureDropDownQuery,
  useGetSingleVatStructureQuery,
  useAddVatStructureMutation,
  useUpdateVatStructureMutation,
} = vatStructureApi;
