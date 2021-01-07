import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Heading,
  Flex,
  Box,
  Text,
  Badge,
  Button,
} from "@chakra-ui/core";
import format from "date-fns/format";

import getOrderTotal from "../../selectors/selectors";

const OrderPreview = ({onClose, order}) => {
  return (
    <Drawer isOpen placement="left" size="full" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent margin={0} padding={0}>
          <DrawerHeader
            display="flex"
            justifyContent="center"
            marginTop={2}
            padding={4}
            width="100%"
          >
            <Heading>Detalle de mi pedido</Heading>
          </DrawerHeader>
          <DrawerBody margin={0} padding={0}>
            <Flex
              align="center"
              backgroundColor="primary.200"
              fontSize={20}
              fontWeight={500}
              h="10vh"
              justify="center"
              margin="auto"
              marginTop={10}
              padding={4}
              w="80%"
            >
              <Box flex={0.3}>Fecha</Box>
              <Box display="flex" flex={0.3} justifyContent={{base: "center", lg: "flex-start"}}>
                Pedido
              </Box>
              <Box display="flex" flex={0.3} justifyContent={{base: "center", lg: "flex-start"}}>
                Precio Total
              </Box>
            </Flex>
            <Flex align="center" justify="center" margin="auto" padding={4} w="80%">
              <Box alignSelf="flex-start" flex={0.3}>
                {" "}
                {format(order.date, "MM/dd/yyyy / HH:mm:ss")}
              </Box>
              <Box
                alignItems={{base: "center", lg: "flex-start"}}
                display="flex"
                flex={0.3}
                flexDirection="column"
              >
                {order.order.map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      alignItems={{base: "center", lg: "flex-start"}}
                      direction="column"
                      w="auto"
                    >
                      <Badge colorScheme="blue" marginY="0.25rem" w="auto">
                        {item.title}
                      </Badge>
                      {item.presentations.map((presentation, index) => {
                        return (
                          <Box key={index}>
                            <Text>
                              Pack: {presentation.count} : {presentation.units}
                            </Text>
                          </Box>
                        );
                      })}
                    </Flex>
                  );
                })}
              </Box>
              <Box
                alignSelf="flex-start"
                display="flex"
                flex={0.3}
                justifyContent={{base: "center", lg: "flex-start"}}
              >
                {getOrderTotal(order)}
              </Box>
            </Flex>
            <Box margin="auto" marginTop={12} w={200}>
              <Button colorScheme="blue" w={128} onClick={(e) => window.print()}>
                Imprimir
              </Button>
            </Box>
            <Box left={2} position="absolute" top="90%">
              <Button colorScheme="red" onClick={onClose}>
                Cerrar
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default OrderPreview;
