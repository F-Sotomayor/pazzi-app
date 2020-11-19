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
  useToast,
} from "@chakra-ui/core";
import {GetServerSideProps} from "next";
import produce from "immer";

import serverApi from "../product/api/server";
import clientApi from "../product/api/client";
import {CartItem, Product} from "../product/types";

interface Props {
  products: Product[];
}

const IndexPage: React.FC<Props> = ({products}) => {
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

  const hasElementsInCart = React.useMemo(() => {
    for (const product of cart) {
      for (const presentation of product.presentations) {
        if (presentation.count) return true;
      }
    }

    return false;
  }, [cart]);

  function handleSubmit() {
    toggleLoading(true);

    clientApi
      .order(cart)
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

  function handleChange(productIndex, presentationIndex, value) {
    setCart(
      produce((cart) => {
        cart[productIndex].presentations[presentationIndex].count = Number.parseInt(value);
      }),
    );
  }

  return (
    <>
      <Container height="auto" maxWidth="100vw" minHeight="100vh" overflowX="hidden" padding={0}>
        <Stack flex={1} height="100%" margin="auto" maxWidth={800} paddingX={4}>
          <Heading height="15vh">
            <Image display="none" height="100%" src="logo.jpg" width="auto" />
          </Heading>
          <Stack height="100%" spacing={12}>
            {products.map((product, productIndex) => {
              const remainingStock = cart[productIndex].presentations.reduce(
                (stock, presentation) => stock - presentation.units * presentation.count,
                product.stock,
              );

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
                  <Stack direction="row" spacing={4}>
                    <Box height="auto" maxHeight="100%">
                      <Image borderRadius="lg" height={24} src="pantest.png" />
                    </Box>
                    <Stack spacing={2}>
                      <Stack spacing={0}>
                        <Text fontSize="2xl" fontWeight={500} lineHeight="normal">
                          {product.title}
                        </Text>
                        <Text fontSize="lg">{product.description}</Text>
                      </Stack>
                      <Text
                        backgroundColor={remainingStock < 0 ? "red.500" : "primary.800"}
                        borderRadius={9999}
                        color="white"
                        fontSize="sm"
                        height="auto"
                        textAlign="center"
                        width={100}
                      >
                        Stock : {remainingStock}
                      </Text>
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
                              {presentation.units}
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
                                  handleChange(
                                    productIndex,
                                    presentationIndex,
                                    Number(event.target.value),
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
            })}
          </Stack>
        </Stack>
      </Container>
      {hasElementsInCart && (
        <Stack
          align="center"
          bottom={0}
          justify="center"
          marginTop={6}
          position="sticky"
          width="100%"
        >
          <Button
            colorScheme="primary"
            isDisabled={hasErrors}
            isLoading={isLoading}
            onClick={handleSubmit}
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
              No hay suficiente stock en alguno de los productos de tu pedido
            </Box>
          )}
        </Stack>
      )}
    </>
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

export default IndexPage;
