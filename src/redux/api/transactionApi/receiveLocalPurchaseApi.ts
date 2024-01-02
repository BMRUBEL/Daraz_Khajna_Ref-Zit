import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const ReceiveLocalPurchase = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  VAT Registration Type
    ReceiveLocalPurchase: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/inventory/api/v1/local-purchase/list",
          method: "GET",
          // params: { pageNo: 1, pageSize: 20, filter: "",dbFieldName:"id",sortDirection:'ASC' },
        };
      },
      providesTags: [tagTypes.ReceiveLocalPurchase],
    }),

    // get single VAT Registration Type
    getSingleReceiveLocalPurchase: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/vat-registration-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.ReceiveLocalPurchase],
    }),

    // create a new vat reg type
    addReceiveLocalPurchase: build.mutation({
      query: (data) => ({
        url: "/vat-registration-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.ReceiveLocalPurchase],
    }),
    // update single item
    updateReceiveLocalPurchase: build.mutation({
      query: (data) => ({
        url: `/vat-registration-type/update/${data.id}`,
        method: "PUT",
        data: JSON.stringify({
          id: `${data.body.id}`,
          vatRegistrationName: `${data.body.vatRegistrationName}`,
          vatRegistrationNameBn: `${data.body.vatRegistrationNameBn}`,
          sequenceNumber: `${data.body.sequenceNumber}`,
          active: `${data.body.active}`,
        }),
      }),
      invalidatesTags: [tagTypes.ReceiveLocalPurchase],
    }),
  }),
});

export const {
  useReceiveLocalPurchaseQuery,
  useGetSingleReceiveLocalPurchaseQuery,
  useAddReceiveLocalPurchaseMutation,
  useUpdateReceiveLocalPurchaseMutation,
} = ReceiveLocalPurchase;
