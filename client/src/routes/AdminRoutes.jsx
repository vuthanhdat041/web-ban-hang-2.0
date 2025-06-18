import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import CustomerManagement from "../Admin/CustomerManager/CustomerManager";
import CustomerHistory from "../Admin/CustomerManager/CustomerHistory";

import OrderManager from "../Admin/OrderManager/OrderManager";
import ProductManager from "../Admin/ProductManager/ProductManager";
import Category from "../Admin/ProductManager/Category/Category";
import Create from "../Admin/ProductManager/CreateProduct/Create";
import ViewProduct from "../Admin/ProductManager/View/ViewProduct";
import EditProduct from "../Admin/ProductManager/EditProduct/EditProduct";
import { UserContext } from "../context/UserContext";
import AccessDenied from "./AccessDenied";
import SuperAdmin from "../Admin/SuperAdmin/SuperAdmin";

function AdminRoutes() {
  const user = useContext(UserContext);
  const role = user?.user?.role_id;

  console.log("🚀 ~ AdminRoutes ~ user:", user.user.role_id);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}> </Suspense>
      <Routes>
        <Route
          path="/homeAdmin/superAdmin"
          element={role === 1 ? <SuperAdmin /> : <AccessDenied />}
        />

        {/* Role 2: ProductManager */}
        <Route
          path="/homeAdmin/productManager"
          element={
            [1, 2].includes(role) ? <ProductManager /> : <AccessDenied />
          }
        />
        <Route
          path="/homeAdmin/productManager/viewProduct/:productId"
          element={[1, 2].includes(role) ? <ViewProduct /> : <AccessDenied />}
        />
        <Route
          path="/homeAdmin/productManager/editProduct/:productId"
          element={[1, 2].includes(role) ? <EditProduct /> : <AccessDenied />}
        />
        <Route
          path="/homeAdmin/productManager/categoryProduct"
          element={[1, 2].includes(role) ? <Category /> : <AccessDenied />}
        />
        <Route
          path="/homeAdmin/productManager/create"
          element={[1, 2].includes(role) ? <Create /> : <AccessDenied />}
        />

        {/* Role 3: OrderManager */}
        <Route
          path="/homeAdmin/orderManager"
          element={[1, 3].includes(role) ? <OrderManager /> : <AccessDenied />}
        />
        {/* Role 4: CustomerManager */}
        <Route
          path="/homeAdmin/customerManager"
          element={
            [1, 4].includes(role) ? <CustomerManagement /> : <AccessDenied />
          }
        />
        <Route
          path="/homeAdmin/customerManager/detail/:userId"
          element={
            [1, 4].includes(role) ? <CustomerHistory /> : <AccessDenied />
          }
        />
        <Route path="*" element={<Navigate to="/homeAdmin/superAdmin" />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
