import { apiSlice } from "./apiSlice"; // Ensure you have the base apiSlice set up
import { USERS_URL } from "../constants"; // Import your API URL constants

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  return token ? { Authorization: `Bearer ${token}` } : {}; // Return headers
};
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        headers: getAuthHeaders()
      })
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        headers: getAuthHeaders()
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST"
      })
    }),
    profile: builder.mutation({
      query: ({data,userId}) => ({
        url: `${USERS_URL}/profile/${userId}`,
        method: "PUT",
        body: data,
        headers: getAuthHeaders() // Use the helper function to set headers
      })
    }),
    getUsers: builder.query({
      query: () => {
        // const token = localStorage.getItem("token"); // Fetch token here
        // console.log("Token in Get Users", token); // Log the token

        return {
          url: `${USERS_URL}`,
          headers: getAuthHeaders() // Add token to request if it exists
        };
      },
      providesTags: ["User"],
      keepUnusedDataFor: 5
    }),
    // Fetch token here

    deleteUser: builder.mutation({
      query: userId => {
        // const token = localStorage.getItem("token"); // Fetch token here
        // console.log("Token in Delete User", token); // Log the token

        return {
          url: `${USERS_URL}/${userId}`,
          method: "DELETE",
          headers: getAuthHeaders() // Add token to request if it exists
        };
      }
      // query: userId => ({
      //   url: `${USERS_URL}/${userId}`,
      //   method: "DELETE",
      //   headers: getAuthHeaders() // Use the helper function to set headers
      // })
    }),
    getUserDetails: builder.query({
      query: id => ({
        url: `${USERS_URL}/${id}`,
        headers: getAuthHeaders() // Use the helper function to set headers
      }),
      keepUnusedDataFor: 5
    }),

    updateUser: builder.mutation({
      query: ({ data, userId }) => {
        console.log("Token in Update User", localStorage.getItem("token")); // Log the token
        return {
          url: `${USERS_URL}/${userId}`,
          method: "PUT",
          body: data,  // Payload for the update
          headers: getAuthHeaders(),  // Include Authorization header
        };
      },
      invalidatesTags: ["User"]
    })
    
  })
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery
} = userApiSlice;
