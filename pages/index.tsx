import React from "react";
import {
  Heading,
  Stack,
  Text,
  Image,
  Box,
  Flex,
  Container,
  Input,
  StackDivider,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core";
import {GetServerSideProps} from "next";
import firebase from "firebase";

import serverApi from "../product/api/server";
import {Product} from "../product/types";
import {Provider as CartProvider} from "../cart/context";
import {useCart} from "../cart/hooks";
import {getRemainingStock} from "../cart/selectors";
import Header from "../components/Header";
import {useUser} from "../session/hooks";
import Footer from "../components/Footer";
interface Props {
  products: Product[];
}

const IndexPage: React.FC<Props> = ({products}) => {
  const {
    cart,
    onChange: onCartChange,
    isEmpty,
    hasErrors,
    isLoading,
    onSubmit,
    deliveryDate,
    onDeliveryDateChange,
  } = useCart();
  const user = useUser();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Container height="auto" maxWidth="100vw" minHeight="100vh" overflowX="hidden" padding={0}>
        <Header />
        <Stack flex={1} height="100%" margin="auto" maxWidth={800} paddingX={4}>
          <Heading height="15vh">
            <Image display="none" height="100%" src="logo.jpg" width="auto" />
          </Heading>
          <>
            <Drawer
              finalFocusRef={btnRef}
              height={{base: "auto"}}
              isOpen={isOpen}
              placement="right"
              size="full"
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontSize={36} textAlign="center">
                  Detalle del pedido
                </DrawerHeader>

                <DrawerBody>
                  <Stack direction="row" h="auto" w="100%">
                    <Flex flex={0.5} justifyContent="center">
                      <Box
                        alignItems="center"
                        backgroundColor="primary.300"
                        borderRadius={8}
                        color="white"
                        display="flex"
                        fontSize={20}
                        height="50px"
                        justifyContent="center"
                        w={{base: "130px", lg: "200px"}}
                      >
                        Producto
                      </Box>
                    </Flex>
                    <Flex flex={0.5} justifyContent="center">
                      <Box
                        alignItems="center"
                        backgroundColor="primary.300"
                        borderRadius={8}
                        color="white"
                        display="flex"
                        fontSize={20}
                        height="50px"
                        justifyContent="center"
                        w={{base: "130px", lg: "200px"}}
                      >
                        Precio
                      </Box>
                    </Flex>
                  </Stack>
                  {cart.map((product) =>
                    product.presentations.map((presentation) => {
                      if (presentation.count > 0)
                        return (
                          <Stack key={product.id} direction="row" h="auto" marginY={4} w="100%">
                            <Flex flex={0.5} justifyContent="center">
                              <Box>{product.title}</Box>
                            </Flex>
                            <Flex flex={0.5} justifyContent="center">
                              <Box w="50px">$ {presentation.price * presentation.count}</Box>
                            </Flex>
                          </Stack>
                        );
                    }),
                  )}
                  <Stack align="center" direction="column" h="auto" marginY={8} w="100%">
                    <Box fontSize={20} fontWeight={500} textAlign={{base: "center"}}>
                      Para cuando quiere el pedido?
                    </Box>
                    <form>
                      <input
                        type="date"
                        onChange={(event) => onDeliveryDateChange(+new Date(event.target.value))}
                      />
                    </form>
                  </Stack>
                  <Stack />
                </DrawerBody>

                <DrawerFooter
                  display="flex"
                  flexDirection="column"
                  height="auto"
                  justifyContent="space-between"
                  w="100%"
                >
                  <Box fontSize={24} fontWeight={500}>
                    Total: $
                    {cart.reduce((accumulator, item) => {
                      item.presentations.forEach((presentation) => {
                        if (presentation.count > 0)
                          accumulator = accumulator + presentation.price * presentation.count;
                      });

                      return accumulator;
                    }, 0)}
                  </Box>
                  <Stack direction="row">
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={onSubmit}>
                      Confirmar
                    </Button>
                  </Stack>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
          <Button
            colorScheme="red"
            left={1}
            position="fixed"
            top={{base: "0%", lg: "90%"}}
            w={128}
            onClick={() => firebase.auth().signOut()}
          >
            Cerrar Sesion
          </Button>
          <Stack height="100%" spacing={12}>
            {products.map((product, productIndex) => {
              const remainingStock = getRemainingStock(cart[productIndex], product.stock);

              if (user.email.includes(product.test) || product.test === "") {
                return (
                  <Stack
                    key={product.id}
                    backgroundColor="gray.50"
                    borderColor="gray.100"
                    borderRadius="lg"
                    borderWidth={1}
                    boxShadow="2xl"
                    divider={<StackDivider />}
                    flex={1}
                    padding={4}
                    spacing={4}
                  >
                    <Stack
                      align={{base: "center"}}
                      direction={{base: "column", lg: "row"}}
                      spacing={4}
                    >
                      <Box
                        display={{base: "flex"}}
                        flex={{base: 0.5}}
                        height="auto"
                        maxHeight="100%"
                      >
                        <Image
                          borderRadius="lg"
                          height={{base: 24, lg: 24}}
                          src={`${product.type}.jpeg`}
                          w={{base: "250px", lg: 40}}
                        />
                      </Box>
                      <Stack flex={{base: 0.5}} spacing={2}>
                        <Stack spacing={0}>
                          <Text
                            fontSize={{base: "1xl", lg: "2xl"}}
                            fontWeight={500}
                            lineHeight="normal"
                            textAlign={{base: "center"}}
                          >
                            {product.title}
                          </Text>
                          <Text fontSize="lg" textAlign={{base: "center"}}>
                            {product.description}
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack spacing={0}>
                      <Flex justifyContent="space-between" width="100%">
                        <Box flex={0.25}>
                          <Text
                            fontSize="xs"
                            fontWeight={500}
                            textAlign="left"
                            textTransform="uppercase"
                          >
                            Unidades
                          </Text>
                        </Box>
                        <Box display="none" flex={0.25}>
                          <Text
                            fontSize="xs"
                            fontWeight={500}
                            textAlign="left"
                            textTransform="uppercase"
                          >
                            Precio unitario
                          </Text>
                        </Box>
                        <Box flex={0.25}>
                          <Text
                            fontSize="xs"
                            fontWeight={500}
                            textAlign="left"
                            textTransform="uppercase"
                          >
                            Cantidad
                          </Text>
                        </Box>
                        <Box display="none" flex={0.25}>
                          <Text
                            fontSize="xs"
                            fontWeight={500}
                            textAlign="right"
                            textTransform="uppercase"
                          >
                            Precio Total
                          </Text>
                        </Box>
                      </Flex>
                      <Stack divider={<StackDivider />} spacing={1}>
                        {product.presentations.map((presentation, presentationIndex) => {
                          const count = cart[productIndex].presentations[presentationIndex].count;

                          return (
                            <Flex
                              key={presentation.units}
                              alignItems="center"
                              justifyContent="space-between"
                              width="100%"
                            >
                              <Text flex={0.25} fontSize={[12, 12, 12, 16]}>
                                {presentation.units} unidad(es)
                              </Text>
                              <Text display="none" flex={0.25} fontSize={[12, 12, 12, 16]}>
                                {presentation.price.toLocaleString("es-AR", {
                                  style: "currency",
                                  currency: "ARS",
                                })}
                              </Text>
                              <Box flex={0.25}>
                                <Input
                                  borderColor="primary.300"
                                  colorScheme="primary"
                                  marginY={1}
                                  maxWidth={100}
                                  size="sm"
                                  step={1}
                                  type="number"
                                  value={count || ""}
                                  variant="filled"
                                  onChange={(event) =>
                                    onCartChange(
                                      productIndex,
                                      presentationIndex,
                                      event.target.value,
                                    )
                                  }
                                />
                              </Box>
                              <Text
                                display="none"
                                flex={0.25}
                                fontSize={[12, 12, 12, 16]}
                                textAlign="right"
                              >
                                {(presentation.price * count).toLocaleString("es-AR", {
                                  style: "currency",
                                  currency: "ARS",
                                })}
                              </Text>
                            </Flex>
                          );
                        })}
                      </Stack>
                    </Stack>
                  </Stack>
                );
              }
            })}
          </Stack>
        </Stack>
        <Footer />
      </Container>
      {!isEmpty && (
        <Stack
          align="center"
          bottom={0}
          justify="center"
          marginTop={6}
          position="sticky"
          width="100%"
        >
          <Button
            ref={btnRef}
            colorScheme="primary"
            isLoading={isLoading}
            marginBottom={{base: "1rem"}}
            w={{base: "300px"}}
            onClick={onOpen}
          >
            Completar pedido
          </Button>

          {hasErrors && (
            <Box
              backgroundColor="red.500"
              borderRadius="md"
              color="white"
              fontSize="sm"
              maxWidth={320}
              padding={2}
              textAlign="center"
            >
              Tu pedido supera el stock actual, es probable que tarde mas de lo debido.
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};

const Wrapper: React.FC<Props> = ({products}) => {
  return (
    <CartProvider products={products}>
      <IndexPage products={products} />
    </CartProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async function ({res}) {
  try {
    const products = await serverApi.list();

    return {props: {products}};
  } catch (error) {
    return {props: {statusCode: error?.status || res?.statusCode}};
  }
};

export default Wrapper;
export {IndexPage};
