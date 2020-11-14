import React from "react";
import {Heading, Stack, Text, Image, Box, Flex, Button, Container, Input} from "@chakra-ui/core";
import {GetServerSideProps} from "next";

import api from "../product/api";
import {Product} from "../product/types";

interface Props {
  products: Product[];
}

const IndexPage: React.FC<Props> = ({products}) => (
  <Container
    display="flex"
    height="auto"
    justifyContent="center"
    maxWidth="100vw"
    overflowX="hidden"
    padding={0}
  >
    <Stack flex={1} height="100%" maxWidth="90vw">
      <Heading height="15vh">
        <Image height="100%" src="logo.jpg" width="auto" />
      </Heading>
      <Box display="flex" flexDirection="column" height="100%">
        {products.map((product) => (
          <Flex
            key={product.id}
            backgroundColor="rgba(0,0,0,0.2)"
            borderRadius={12}
            direction="column"
            flex={1}
            marginBottom={4}
            padding={4}
          >
            <Flex>
              <Box height="auto" maxHeight="100%">
                <Image borderRadius={12} height={120} src="pantest.png" />
              </Box>
              <Flex direction="column" justifyContent="space-between" marginLeft={12}>
                <Text fontSize={[16, 16, 16, 24]}>{product.title}</Text>
                <Text fontSize={[12, 12, 12, 20]}>{product.description}</Text>
                <Text
                  backgroundColor="rgba(0,0,0,0.9)"
                  borderRadius={12}
                  color="white"
                  fontSize={[12, 12, 12, 16]}
                  height="auto"
                  textAlign="center"
                  width={100}
                >
                  Stock : {product.stock}
                </Text>
              </Flex>
            </Flex>
            <Flex direction="column" padding={2}>
              <Flex justifyContent="space-between" width="100%">
                <Box flex={0.25}>
                  <Text fontSize={[12, 12, 12, 16]} textAlign="left">
                    Unidades
                  </Text>
                </Box>
                <Box flex={0.25}>
                  <Text fontSize={[12, 12, 12, 16]} textAlign="left">
                    Precio unitario
                  </Text>
                </Box>
                <Box flex={0.25}>
                  <Text fontSize={[12, 12, 12, 16]} textAlign="left">
                    Cantidad
                  </Text>
                </Box>
                <Box flex={0.25}>
                  <Text fontSize={[12, 12, 12, 16]} textAlign="right">
                    Precio Total
                  </Text>
                </Box>
              </Flex>
              {product.presentations.map((presentation) => (
                <Flex
                  key={presentation.id}
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Text flex={0.25} fontSize={[12, 12, 12, 16]}>
                    {presentation.units}
                  </Text>
                  <Text flex={0.25} fontSize={[12, 12, 12, 16]}>
                    {presentation.price}
                  </Text>
                  <Box flex={0.25}>
                    <Input borderColor="primary.300" marginY={1} type="number" />
                  </Box>
                  <Text flex={0.25} fontSize={[12, 12, 12, 16]} textAlign="right">
                    $ 15151
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Box>
    </Stack>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async function ({res}) {
  try {
    const products = await api.list();

    return {props: {products}};
  } catch (error) {
    return {props: {statusCode: error?.status || res?.statusCode}};
  }
};

export default IndexPage;
