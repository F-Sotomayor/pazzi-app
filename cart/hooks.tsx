import React from "react";

import CartContext, {Context} from "./context";

export function useCart(): {
  cart: Context["state"]["cart"];
  hasErrors: Context["state"]["hasErrors"];
  isLoading: Context["state"]["isLoading"];
  isEmpty: Context["state"]["isEmpty"];
  onChange: Context["actions"]["onChange"];
  onSubmit: Context["actions"]["onSubmit"];
  onDeliveryDateChange: Context["actions"]["onDeliveryDateChange"];
  deliveryDate: Context["state"]["deliveryDate"];
} {
  const {
    state: {cart, isEmpty, hasErrors, isLoading, deliveryDate},
    actions: {onChange, onSubmit, onDeliveryDateChange},
  } = React.useContext(CartContext);

  return {
    cart,
    hasErrors,
    isEmpty,
    onChange,
    isLoading,
    onSubmit,
    onDeliveryDateChange,
    deliveryDate,
  };
}
