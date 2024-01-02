import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const vehicleTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all vehicle type
    vehcileType: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/vehicle-type/all",
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
      providesTags: [tagTypes.vehicletype],
    }),
  
    // get single transaction
    getSingleVehicleType: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/vehicle-type/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vehicletype],
    }),
    // create a new transaction
    addVehcleType: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/vehicle-type/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vehicletype],
    }),
    // update ac department
    updateVehicleType: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/vehicle-type/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.vehicletype],
    }),
  }),
});

export const {
  useVehcileTypeQuery,
  useGetSingleVehicleTypeQuery,
  useAddVehcleTypeMutation,
  useUpdateVehicleTypeMutation,
} = vehicleTypeApi;
