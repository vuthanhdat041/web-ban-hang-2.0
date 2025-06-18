import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { addToCart, deleteCart, getOrderUser } from "../services/orderService";
import { UserContext } from "./UserContext";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const user = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const fetchCartContext = async () => {
    if (!user?.user) return; // Kiểm tra người dùng

    try {
      setLoading(true);
      const res = await getOrderUser(user.user.id);

      if (
        res.data.code === 201 &&
        Array.isArray(res.data.data) &&
        res.data.data.length > 0
      ) {
        const { Products, ...orderDetails } = res.data.data[0];
        setCart(Products || []);
        setOrder(orderDetails);
      } else {
        setCart([]);
        setOrder({});
      }
    } catch (err) {
      console.error("Lỗi khi fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCartContext = async (product) => {
    try {
      const res = await addToCart(product);
      if (res.data.code === 201) {
        fetchCartContext();
      }
      return res;
    } catch (err) {
      console.log("🚀 ~ addToCartContext ~ err:", err);
    }
  };
  const deleteCartContext = async (product) => {
    try {
      const res = await deleteCart(product);
      // if (res.data.code === 201) {
      //   fetchCartContext();
      // }
      return res;
    } catch (err) {
      console.log("🚀 ~ deleteCartContext ~ err:", err);
    }
  };

  // const removeFromCart = async (product_id) => {
  //     try {
  //         await axios.delete(`/api/cart/remove/${product_id}`);
  //         await fetchCart();
  //     } catch (err) {
  //         console.error("Lỗi khi xóa:", err);
  //     }
  // };

  // const clearCart = async () => {
  //     try {
  //         await axios.delete("/api/cart/clear");
  //         setCart([]); // hoặc fetch lại
  //     } catch (err) {
  //         console.error("Lỗi khi clear:", err);
  //     }
  // };

  useEffect(() => {
    if (user?.user?.id) {
      fetchCartContext();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        order,
        setCart,
        addToCartContext,
        fetchCartContext,
        deleteCartContext,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
