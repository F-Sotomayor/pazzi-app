import React from "react";
import {Heading, Stack, Text, Image, Box, Flex, Button} from "@chakra-ui/core";
import {GetServerSideProps} from "next";

import api from "../product/api";
import {Product} from "../product/types";

interface Props {
  products: Product[];
}

const IndexPage: React.FC<Props> = ({products}) => (
  <Stack minHeight="100vh" width="100vw">
    <Heading
      alignItems="center"
      backgroundColor="white"
      color="primary.300"
      display="flex"
      height="15vh"
      justifyContent="space-between"
      padding={4}
    >
      <Image height="125%" src="logo.jpg" />
      <Text marginRight={6}>Pazzi </Text>
    </Heading>
    <Stack color="primary.500">
      {products.map((product) => (
        <Stack key={product.id} padding={6} width="100vw">
          <Heading fontSize={24}>{product.presentations[0].title}</Heading>
          <Flex height="25vh">
            <Box flex={1} height="100%">
              <Image borderRadius={6} height="100%" src="pantest.png" />
            </Box>
            <Box
              alignItems="flex-start"
              display="flex"
              flex={1.25}
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
              paddingX={2}
            >
              <Text color="primary.800" fontWeight={600}>
                {product.presentations[0].description}
              </Text>
              <Text>
                <Text color="black" fontWeight={600}>
                  Stock Disponible: {product.presentations[0].units}
                </Text>
                <Text color="black" fontWeight={600}>
                  Precio Total: ${product.presentations[0].price}
                </Text>
              </Text>
            </Box>
          </Flex>
          <Button colorScheme="blue">Agregar al pedido</Button>
        </Stack>
      ))}
    </Stack>
  </Stack>
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
