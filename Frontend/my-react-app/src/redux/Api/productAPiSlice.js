import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  return token ? { Authorization: `Bearer ${token}` } : {};
  console.log("Token", token); // Return headers
};
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword }
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"]
    }),

    getProductById: builder.query({
      query: productId => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId }
      ]
    }),

    allProducts: builder.query({
      query: () => `${PRODUCT_URL}/allProducts`,
      headers: getAuthHeaders()
    }),

    getProductDetails: builder.query({
      query: productId => ({
        url: `${PRODUCT_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    }),

    createProduct: builder.mutation({
      query: productData => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
        headers: getAuthHeaders()
      }),
      invalidatesTags: ["Product"]
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
        headers: getAuthHeaders()
      })
    }),

    uploadProductImage: builder.mutation({
      query: data => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
        headers: getAuthHeaders()
      })
    }),

    deleteProduct: builder.mutation({
      query: productId => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
        headers: getAuthHeaders()
      }),
      providesTags: ["Product"]
    }),

    createReview: builder.mutation({
      query: data => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data
      })
    }),

    getTopProducts: builder.query({
      query: () => `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5
    }),

    getNewProducts: builder.query({
      query: () => `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5
    }),

    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio }
      })
    })
  })
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery
} = productApiSlice;
