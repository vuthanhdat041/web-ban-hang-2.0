import React, { useState } from "react";
import OrderList from "./OrderList/OrderList";
import OrderDetails from "./OrderDetails/OrderDetails";

const OrderManager = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      {selectedOrder ? (
        <OrderDetails
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
        />
      ) : (
        <OrderList onView={(order) => setSelectedOrder(order)} />
      )}
    </>
  );
};

export default OrderManager;
