import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all Department
    department: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/company-department/all",
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
    // get single Department
    getSingleDepartment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/company-department/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customersetup],
    }),

    // create a new Department
    addDepartment: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/company-department/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
    // update a single Department
    updateDepartment: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/company-department/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.customersetup],
    }),
  }),
});

export const {
  useDepartmentQuery,
  useSectionDropDownQuery,
  useGetSingleDepartmentQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
