import {Box, Button, Flex, Heading, Stack} from "@chakra-ui/core";
import React from "react";
import {format} from "date-fns";

import api from "../order/api/client";
import {Order} from "../order/types";
import {useUser} from "../session/hooks";

const OrdersPage = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const user = useUser();

  React.useEffect(() => {
    api.list(user.email).then(setOrders);
  }, [user.email]);

  function getOrderTotal(orders: Order): string {
    const total = orders.order.reduce((total, item) => {
      return total + item.presentations.reduce((total, {count, price}) => total + count * price, 0);
    }, 0);

    return total.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  }

  console.log(orders);

  return (
    <Stack align="center" maxH="auto" maxW="100vw" minH="100vh" minW="100vw" padding={4}>
      <Heading>Mis pedidos</Heading>
      <Stack align="center" h="auto" w="100%">
        <Flex
          backgroundColor="primary.100"
          fontSize={20}
          fontWeight={500}
          marginTop={12}
          padding={2}
          w="50%"
        >
          <Box flex={0.5}>Fecha</Box>
          <Box flex={0.3}>Total</Box>
          <Box flex={0.3} />
        </Flex>
        {orders.map((order) => {
          return (
            <Flex
              key={order.date}
              align="center"
              borderBottom="0.5px solid"
              borderColor="primary.100"
              h="auto"
              marginTop={2}
              padding={2}
              w="50%"
            >
              <Box flex={0.5} fontSize={20}>
                {format(order.date, "MM/dd/yyyy / HH:mm:ss")}
              </Box>
              <Box flex={0.3} fontSize={20}>
                {getOrderTotal(order)}
              </Box>
              <Box display="flex" flex={0.3} justifyContent="center">
                <Button colorScheme="red">Descargar Orden</Button>
              </Box>
            </Flex>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default OrdersPage;
