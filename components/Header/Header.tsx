import React from "react";
import {Box, Stack, Image, Flex, Text} from "@chakra-ui/core";

const Header = () => {
  return (
    <Stack height="auto" paddingX={24} width="100vw">
      <Box
        backgroundImage="url(bgheader.jpg)"
        backgroundPosition="center"
        backgroundSize="cover"
        borderBottomRadius="md"
        height="128px"
        width="100%"
      />
      <Flex height="30vh" paddingY={4} width="100%">
        <Flex align="center" flex={0.3} height="100%">
          <Box
            backgroundImage="url(bgheader.jpg)"
            backgroundPosition="center center"
            backgroundSize="fill"
            border="3px solid white"
            borderRadius="50%"
            display="flex"
            height={52}
            justifyContent="center"
            marginLeft={20}
            transform="translateY(-25%)"
            width={52}
          />
        </Flex>
        <Flex flex={0.7} height="100%">
          <Box display="flex" flexDirection="column">
            <Text fontSize={28} fontWeight={700} marginBottom={2}>
              Pazzi Panes de Papa
            </Text>
            <Text color="rgb(113, 128, 150)" fontSize={20} marginBottom={2}>
              Una descripcion que no se me ocurre ni en joda
            </Text>
            <Text alignItems="center" color="primary.300" display="flex" fontSize={20}>
              <Image
                height={5}
                src="https://icongr.am/clarity/map-marker.svg?size=128&color=364be7"
                width={5}
              />
              Av. Hipolito Yrigoyen 1234, C1106 ACR, Buenos Aires, Argentina.
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Text
        alignItems="center"
        backgroundColor="primary.300"
        borderRadius="md"
        color="primary.50"
        display="flex"
        fontSize={20}
        height="8vh"
        justifyContent="center"
        width="100%"
      >
        Todos los pedidos hechos pasadas las 15hs recien seran leidos al otro dia!
      </Text>
    </Stack>
  );
};

export default Header;
