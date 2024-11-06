import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute";

// Auth
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

import AdminRoute from "./Pages/Admin/AdminRoute";
import Profile from "./Pages/User/Profile";
import UserList from "./Pages/Admin/UserList";

import CategoryList from "./Pages/Admin/CategoryList";

import ProductList from "./Pages/Admin/ProductList";
import AllProducts from "./Pages/Admin/AllProducts";
import ProductUpdate from "./Pages/Admin/ProductUpdate";

// // import Home from "./Pages/Home.jsx";
import Favourites from "./Pages/Products/Favourites.jsx";
import ProductDetails from "./Pages/Products/ProductDetails.jsx";

// import Cart from "./Pages/Cart.jsx";
import Shop from "./Pages/Shop.jsx";

// import Shipping from "./Pages/Orders/Shipping.jsx";
// import PlaceOrder from "./Pages/Orders/PlaceOrder.jsx";
// import Order from "./Pages/Orders/Order.jsx";
// import OrderList from "./Pages/Admin/OrderList.jsx";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import AdminDashboard from "./Pages/Admin/AdminDashBoard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorite" element={<Favourites />} />
      <Route path="/shop" element={<Shop />} />
     
      <Route  element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        </Route>

      <Route path="/admin" element={<AdminRoute />}>
      <Route path="userlist" element={<UserList />} />
      <Route path="categorylist" element={<CategoryList />} />
      <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
      </Route>
  
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     {/* <PayPalScriptProvider> */}
      <RouterProvider router={router} />
      {/* </PayPalScriptProvider> */}
  </Provider>
);