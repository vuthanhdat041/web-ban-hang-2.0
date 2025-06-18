import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";

import { lazy, Suspense } from "react";
import Global from "../pages/Global/Global";
import Accessories from "../pages/Accessories/Accessories";
import AllProducts from "../pages/AllProducts/AllProducts";
import About from "../pages/About/Abouts";
import OurCollection from "../pages/OurCollection/OurCollection";
import Contact from "../pages/Contact/Contact";
import Gift from "../pages/Gift/gift";
import Login from "../pages/Login/Login";
import Account from "../pages/Account/Account";
import Register from "../pages/Register/Register";
import EditAddress from "../pages/EditAddress/EditAddress";
import Checkout from "../pages/Checkout/Checkout";

import SilverBracelet from "../pages/FourCollection/SilverBracelet/SilverBracelet";
import SilverChain from "../pages/FourCollection/SilverChain/SilverChain";
import SilverEarring from "../pages/FourCollection/SilverEarring/SilverEarring";
import SilverRing from "../pages/FourCollection/SilverRing/SilverRing";
import Search from "../pages/Search/Search";
import Success from "../pages/Checkout/Success/Success";
import Preview from "../components/PreviewProduct/PreviewProduct";
const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products"));

const CustomerRoutes = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}> </Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/holidayGift" element={<Gift />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<Success />} />
        <Route path="/collections/accessories" element={<Accessories />} />
        <Route path="/ourCollections/" element={<OurCollection />} />
        <Route path="/search" element={<Search />} />
        <Route path="/collections/nhan-bac" element={<SilverRing />} />
        <Route path="/collections/vong-tay-bac" element={<SilverBracelet />} />
        <Route path="/collections/khuyen-tai-bac" element={<SilverEarring />} />
        <Route path="/collections/day-chuyen-bac" element={<SilverChain />} />
        <Route path="/allproduct" element={<AllProducts />} />
        <Route path="/product/:id" element={<Preview />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/addresses" element={<EditAddress />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default CustomerRoutes;
