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
} from "@chakra-ui/core";
import {GetServerSideProps} from "next";

import api from "../product/api";
import {Product} from "../product/types";

interface Props {
  products: Product[];
}

const IndexPage: React.FC<Props> = ({products}) => (
  <Container height="auto" maxWidth="100vw" minHeight="100vh" overflowX="hidden" padding={0}>
    <Stack flex={1} height="100%" margin="auto" maxWidth={800} paddingX={4}>
      <Heading height="15vh">
        <Image height="100%" src="logo.jpg" width="auto" />
      </Heading>
      <Stack height="100%" spacing={12}>
        {products.map((product) => (
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
                  backgroundColor="gray.800"
                  borderRadius={9999}
                  color="white"
                  fontSize="sm"
                  height="auto"
                  textAlign="center"
                  width={100}
                >
                  Stock : {product.stock}
                </Text>
              </Stack>
            </Stack>
            <Stack spacing={0}>
              <Flex justifyContent="space-between" width="100%">
                <Box flex={0.25}>
                  <Text fontSize="xs" fontWeight={500} textAlign="left" textTransform="uppercase">
                    Unidades
                  </Text>
                </Box>
                <Box flex={0.25}>
                  <Text fontSize="xs" fontWeight={500} textAlign="left" textTransform="uppercase">
                    Precio unitario
                  </Text>
                </Box>
                <Box flex={0.25}>
                  <Text fontSize="xs" fontWeight={500} textAlign="left" textTransform="uppercase">
                    Cantidad
                  </Text>
                </Box>
                <Box flex={0.25}>
                  <Text fontSize="xs" fontWeight={500} textAlign="right" textTransform="uppercase">
                    Precio Total
                  </Text>
                </Box>
              </Flex>
              <Stack divider={<StackDivider />} spacing={1}>
                {product.presentations.map((presentation) => (
                  <Flex
                    key={presentation.units}
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Text flex={0.25} fontSize={[12, 12, 12, 16]}>
                      {presentation.units}
                    </Text>
                    <Text flex={0.25} fontSize={[12, 12, 12, 16]}>
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
                        type="number"
                        variant="filled"
                      />
                    </Box>
                    <Text flex={0.25} fontSize={[12, 12, 12, 16]} textAlign="right">
                      {Number(1500).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
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
