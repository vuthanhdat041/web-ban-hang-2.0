import { createContext, useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  editInforProduct,
  getAccessories,
  getAllProduct,
  getAllProductWithoutAccessories,
  getNewestProduct,
  getProductDetail,
} from "../services/productService";

// Khởi tạo Context
const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [newestProducts, setNewestProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [productsByCondition, setProductsByCondition] = useState([]);

  const [loading, setLoading] = useState(false);
  let ms = 300;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getAllProductContext = async () => {
    try {
      const res = await getAllProduct();
      if (res.data.code === 201) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getAllProductContext ~ error:", error);
    }
  };
  const allProductWithoutAccessoriesContext = async (condition) => {
    console.log(
      "🚀 ~ allProductWithoutAccessoriesContext ~ condition:",
      condition
    );
    try {
      setLoading(true);
      await delay(ms);
      const res = await getAllProductWithoutAccessories(condition);
      if (res?.data?.code === 201 || Array.isArray(res?.data?.data)) {
        setProductsByCondition(res.data.data || []);
      } else {
        setProductsByCondition([]);
      }
    } catch (error) {
      console.log("🚀 ~ AllProductWithoutAccessoriesContext ~ error:", error);
    } finally {
      setLoading(false); // 👉 kết thúc loading dù thành công hay lỗi
    }
  };

  const getProductDetailContext = async (productId) => {
    try {
      const res = await getProductDetail(productId);
      if (res.data.code === 200) {
        setProductDetail(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getProductDetailContext ~ error:", error);
    }
  };

  const getNewestProductContext = async () => {
    try {
      const res = await getNewestProduct();
      if (res.data.code === 201) {
        setNewestProducts(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getNewestProductContext ~ error:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        accessories,
        newestProducts,
        productDetail,
        productsByCondition,
        getAllProductContext,
        allProductWithoutAccessoriesContext,
        getProductDetailContext,
        getNewestProductContext,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
