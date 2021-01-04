import React from "react";

import CartContext, {Context} from "./context";

export function useCart(): {
  cart: Context["state"]["cart"];
  hasErrors: Context["state"]["hasErrors"];
  isLoading: Context["state"]["isLoading"];
  isEmpty: Context["state"]["isEmpty"];
  onChange: Context["actions"]["onChange"];
  onSubmit: Context["actions"]["onSubmit"];
} {
  const {
    state: {cart, isEmpty, hasErrors, isLoading},
    actions: {onChange, onSubmit},
  } = React.useContext(CartContext);

  return {cart, hasErrors, isEmpty, onChange, isLoading, onSubmit};
}
