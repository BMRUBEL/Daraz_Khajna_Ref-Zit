import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const transTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  address type
    addresstype: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/address-type/all",
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
      providesTags: [tagTypes.addresstype],
    }),
    
    // get single address type
    getSingleAddressType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/address-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.addresstype],
    }),
    // create a new address type
    addAddressType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/address-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.addresstype],
    }),
    // update ac address type
    updateAddressType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/address-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.addresstype],
    }),
  }),
});

export const {
  useAddresstypeQuery,
  useGetSingleAddressTypeQuery,
  useAddAddressTypeMutation,
  useUpdateAddressTypeMutation,
} = transTypeApi;
