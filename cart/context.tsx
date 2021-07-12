import React from "react";
import {useToast, Text, Box} from "@chakra-ui/core";
import produce from "immer";

import {Product} from "../product/types";
import clientApi from "../product/api/client";

import {CartItem} from "./types";

export interface Context {
  state: {
    isLoading: boolean;
    cart: CartItem[];
    hasErrors: boolean;
    isEmpty: boolean;
    deliveryDate: number;
  };
  actions: {
    onChange: (productIndex: number, presentationIndex: number, value: string) => void;
    onSubmit: VoidFunction;
    onDeliveryDateChange: (deliveryDate: number) => void;
  };
}

interface Props {
  products: Product[];
}

const CartContext = React.createContext<Context>({} as Context);

const CartProvider: React.FC<Props> = ({children, products}) => {
  const [deliveryDate, setDeliveryDate] = React.useState(+new Date());
  const toast = useToast();
  const [isLoading, toggleLoading] = React.useState(false);
  const [cart, setCart] = React.useState<CartItem[]>(() =>
    products.map((product) => ({
      id: product.id,
      title: product.title,
      presentations: product.presentations.map((presentation) => ({
        ...presentation,
        count: 0,
      })),
    })),
  );

  const hasErrors = React.useMemo(() => {
    for (const productIndex in cart) {
      const productStock = cart[productIndex].presentations.reduce(
        (stock, presentation) => stock - presentation.units * presentation.count,
        products[productIndex].stock,
      );

      if (productStock < 0) {
        return true;
      }
    }

    return false;
  }, [cart, products]);

  const isEmpty = React.useMemo(() => {
    for (const product of cart) {
      for (const presentation of product.presentations) {
        if (presentation.count) return false;
      }
    }

    return true;
  }, [cart]);

  function onChange(productIndex: number, presentationIndex: number, value: string) {
    setCart(
      produce((cart) => {
        cart[productIndex].presentations[presentationIndex].count = Number.parseInt(
          String(Number(value)),
        );
      }),
    );
  }

  function onDeliveryDateChange(deliveryDate) {
    console.log(deliveryDate);
    setDeliveryDate(deliveryDate);
  }

  function onSubmit() {
    toggleLoading(true);

    clientApi
      .order(cart, deliveryDate)
      .then(() => {
        toggleLoading(false);
        toast({
          position: "bottom",
          render: () => {
            return (
              <Box
                alignItems="center"
                bg="primary.400"
                borderRadius={4}
                color="white"
                display="flex"
                justifyContent="center"
                p={3}
              >
                <Text>Tu orden ha sido creada!</Text>
              </Box>
            );
          },
        });
      })
      .catch(() => {
        toggleLoading(false);
        toast({
          position: "bottom",
          render: () => (
            <Box
              alignItems="center"
              bg="red.400"
              borderRadius={4}
              color="white"
              display="flex"
              justifyContent="center"
              p={3}
            >
              <Text>Hubo un error creando tu orden</Text>
            </Box>
          ),
        });
      });
  }

  const state = {
    cart,
    isEmpty,
    hasErrors,
    isLoading,
    deliveryDate,
  };
  const actions = {
    onChange,
    onSubmit,
    onDeliveryDateChange,
  };

  return <CartContext.Provider value={{state, actions}}>{children}</CartContext.Provider>;
};

export {CartContext as default, CartProvider as Provider};
