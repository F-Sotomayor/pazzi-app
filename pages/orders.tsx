import {Box, Button, Flex, Heading, Stack, Image, Link} from "@chakra-ui/core";
import React from "react";
import {format} from "date-fns";

import api from "../order/api/client";
import {Order} from "../order/types";
import {useUser} from "../session/hooks";
import OrderPreview from "../components/Modal/Modal";
import getOrderTotal from "../selectors/selectors";

const OrdersPage = () => {
  const [selected, setSelected] = React.useState(null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const user = useUser();

  React.useEffect(() => {
    api.list(user.email).then(setOrders);
  }, [user.email]);

  return (
    <Stack align="center" maxH="auto" maxW="100vw" minH="100vh" minW="100vw" padding={4}>
      <Heading>Mis pedidos</Heading>
      <Stack align="center" h="auto" w={{base: "100vw", lg: "125%"}}>
        <Flex
          align={{base: "center"}}
          backgroundColor="primary.100"
          direction={{base: "column", lg: "row"}}
          fontSize={20}
          fontWeight={500}
          marginTop={12}
          padding={2}
          w={{base: "100%", lg: "50%"}}
        >
          <Box flex={{base: 1, lg: 0.1}}>Orden</Box>
          <Box flex={{base: 1, lg: 0.3}}>Fecha</Box>
          <Box flex={{base: 1, lg: 0.3}}>Fecha de entrega</Box>
          <Box flex={{base: 1, lg: 0.2}}>Total</Box>
          <Box flex={{base: 1, lg: 0.2}} />
        </Flex>
        {orders.map((order) => {
          if (order.deliveryDate)
            return (
              <Flex
                key={order.date}
                align="center"
                borderBottom="0.5px solid"
                borderColor="primary.100"
                flexDirection={{base: "column", lg: "row"}}
                h="auto"
                marginTop={2}
                padding={2}
                w={{base: "100%", lg: "50%"}}
              >
                <Box flex={{base: 1, lg: 0.1}} fontSize={20} marginY={{base: "4px"}}>
                  {order.ordernumber}
                </Box>
                <Box flex={{base: 1, lg: 0.35}} fontSize={20} marginY={{base: "4px"}}>
                  {format(order.date, "MM/dd/yyyy / HH:mm:ss")}
                </Box>
                <Box flex={{base: 1, lg: 0.35}} fontSize={20} marginY={{base: "4px"}}>
                  {format(order.deliveryDate, "MM/dd/yyyy")}
                </Box>
                <Box flex={{base: 1, lg: 0.15}} fontSize={20} marginY={{base: "4px"}}>
                  {getOrderTotal(order)}
                </Box>
                <Box
                  display="flex"
                  flex={{base: 1, lg: 0.3}}
                  justifyContent="center"
                  marginY={{base: "4px"}}
                >
                  <Button colorScheme="whatsapp" w={128} onClick={() => setSelected(order)}>
                    <Image
                      h={6}
                      src="https://icongr.am/octicons/eye.svg?size=128&color=ffffff"
                      w={6}
                    />
                  </Button>
                </Box>
              </Flex>
            );
        })}
        {selected && <OrderPreview order={selected} onClose={() => setSelected(null)} />}
        <Link href="./">
          <Button colorScheme="blue" left={2} position="absolute" top="90%">
            Volver
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default OrdersPage;
