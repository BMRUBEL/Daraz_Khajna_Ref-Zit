import { IDepartment, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const DEPARTMENT_URL = "/management-departments";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all department
    departments: build.query({
      query: (arg: Record<string, any>) => ({
        url: DEPARTMENT_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.department],
    }),

    // add a department
    addDepartment: build.mutation({
      query: (data) => ({
        url: DEPARTMENT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.department],
    }),

    // get single department by id
    department: build.query({
      query: (id) => ({
        url: `/${DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.department],
    }),

    // update department
    updateDepartment: build.mutation({
      query: (data) => ({
        url: `/${DEPARTMENT_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.department],
    }),

    // delete single department by id
    deleteDepartment: build.mutation({
      query: (id) => ({
        url: `/${DEPARTMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.department],
    }),
  }),
});

export const {
  useDepartmentsQuery,
  useAddDepartmentMutation,
  useDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
