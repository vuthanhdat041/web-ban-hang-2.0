import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
// import { Suspense, lazy } from 'react';
import Footer from "./components/Footer/Footer";

import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import NavAdmin from "./Admin/NavAdmin/NavAdmin";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  const user = useContext(UserContext);

  // console.log("🚀 ~ App ~ user:", user);

  const roleId = user?.user?.role_id ?? "";
  const isAdmin = [1, 2, 3, 4].includes(roleId);
  const isCustomer = roleId === 5;

  return (
    <div className="container">
      <Router>
        <ScrollToTop />
        <div className="navbar">{isAdmin ? <NavAdmin /> : <Navbar />}</div>
        <div className="content">
          {isAdmin ? <AdminRoutes /> : <CustomerRoutes />}
        </div>
      </Router>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
