import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  return token ? { Authorization: `Bearer ${token}` } : {};
  console.log("Token", token); // Return headers
};
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
        headers: getAuthHeaders()
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
        headers: getAuthHeaders()
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
        headers: getAuthHeaders()
      }),
    }),

    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
      headers: getAuthHeaders()
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;