import React from "react";
import {Box, Stack, Image, Flex, Text, Button, Link} from "@chakra-ui/core";

const Header = () => {
  return (
    <Stack height="auto" paddingX={{base: "6px", lg: "24px"}} width="100vw">
      <Box
        backgroundImage="url(bgheader.jpg)"
        backgroundPosition="center"
        backgroundSize="cover"
        borderBottomRadius="md"
        height="350px"
        width="100%"
      />
      <Flex
        direction={{base: "column", lg: "row"}}
        height={{base: "50vh", lg: "35vh"}}
        paddingY={4}
        width="100%"
      >
        <Flex align="center" flex={0.3} height="100%">
          <Box
            backgroundImage="url(logo.png)"
            backgroundPosition="center center"
            backgroundSize="contain"
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
        <Flex
          direction={{base: "column", lg: "row"}}
          flex={0.7}
          height="100%"
          padding={{base: "6px", lg: "0"}}
        >
          <Box
            alignItems={{base: "center", lg: "flex-start"}}
            display="flex"
            flexDirection="column"
          >
            <Text fontSize={28} fontWeight={700} marginBottom={2}>
              Pazzi Panes de Papa
            </Text>
            <Text
              color="rgb(113, 128, 150)"
              fontSize={20}
              marginBottom={2}
              textAlign={{base: "center"}}
            >
              Una descripcion que no se me ocurre ni en joda
            </Text>
          </Box>
          <Box display="flex" justifyContent={{base: "center", lg: ""}}>
            <Link _hover={{textDecoration: "none"}} href="./orders">
              <Button colorScheme="blue" marginTop={{base: "8rem", lg: "0"}}>
                Ver mis pedidos
              </Button>
            </Link>
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
        height={{base: "12vh", lg: "8vh"}}
        justifyContent="center"
        padding={{base: "0.5rem", lg: "0"}}
        width="100%"
      >
        Todos los pedidos hechos pasadas las 15hs recien seran leidos al otro dia!
      </Text>
    </Stack>
  );
};

export default Header;
