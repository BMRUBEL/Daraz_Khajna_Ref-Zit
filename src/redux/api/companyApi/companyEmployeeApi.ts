import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const companyEmployeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all employee
    companyEmployee: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-employee/all",
          method: "GET",
          params: {  pageNo: arg.page !== undefined ? arg.page : 0,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection },
        };
      },
      providesTags: [tagTypes.companyemployee],
    }),

    //Department drop down
    selectDepartment: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-employee/drop-down",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.companyemployee],
    }),

    // get single employee
    getSingleEmployee: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company-employee/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.companyemployee],
    }),

    // create a new employee

    createEmployee: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company-employee/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
    // createEmployee: build.mutation({
    //   query: (data) => {
    //     const formData = new FormData();

    //     // Append the data to the FormData object
    //     Object.keys(data).forEach((key) => {
    //       formData.append(key, data[key]);
    //     });

    //     return {
    //       url: "/inventory/api/v1/local-purchase/add",
    //       method: "POST",
    //       body: formData,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${axiosInstance.defaults.headers.Authorization}`,
    //         // Add any other headers needed for file uploads
    //       },
    //     };
    //   },
    //   invalidatesTags: [tagTypes.companyemployee],
    // }),
    // updatea single employee
    updateEmployee: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company-employee/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.companyemployee],
    }),
  }),
});

export const {
  useCompanyEmployeeQuery,
  useSelectDepartmentQuery,
  useGetSingleEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} = companyEmployeeApi;
