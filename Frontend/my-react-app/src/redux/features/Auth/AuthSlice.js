// import { createSlice } from "@reduxjs/toolkit";

// // Function to get user info from localStorage with error handling
// const getUserInfo = () => {
//   const storedUserInfo = localStorage.getItem("userInfo");
//   try {
//     return storedUserInfo ? JSON.parse(storedUserInfo) : null;
//   } catch (error) {
//     console.error("Failed to parse userInfo from localStorage:", error);
//     return null;
//   }
// };

// // Initial state
// const initialState = {
//   userInfo: getUserInfo(), // Fetch user info from localStorage initially
//   token: localStorage.getItem("token") || null,
//   isAuthenticated: !!localStorage.getItem("token") // Set authentication status based on token presence
// };

// // Create slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload; // Store user info in state only
//       state.token = action.payload.token; // Store token separately
//       state.isAuthenticated = true; // Update authentication status

//       // Save token in localStorage
//       localStorage.setItem("token", action.payload.token);

//       const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
//       localStorage.setItem("expirationTime", expirationTime);
//     },
//     logout: state => {
//       state.userInfo = null; // Clear userInfo in state
//       state.token = null; // Clear the token
//       state.isAuthenticated = false; // Update authentication status
//       localStorage.removeItem("token"); // Clear localStorage token
//     },
//     // Optional: Check if the token has expired
//     checkExpiration: state => {
//       const expirationTime = localStorage.getItem("expirationTime");
//       if (expirationTime && new Date().getTime() > Number(expirationTime)) {
//         // Token has expired
//         state.token = null;
//         state.userInfo = null; // Clear user info when token expires
//         state.isAuthenticated = false;
//         localStorage.removeItem("token");
//       }
//     }
//   }
// });

// // Export actions
// export const { setCredentials, logout, checkExpiration } = authSlice.actions;

// // Default export
// export default authSlice.reducer;
