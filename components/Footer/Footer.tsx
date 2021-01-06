import React from "react";
import {Flex, Stack, Image} from "@chakra-ui/core";

const Footer = () => {
  return (
    <Stack
      backgroundColor="gray.50"
      height={{base: "40vh", lg: "15vh"}}
      justify="center"
      marginTop={8}
      padding={4}
      width="100%"
    >
      <Flex
        align="center"
        direction={{base: "column", lg: "row"}}
        height="100%"
        justify="center"
        width="100%"
      >
        <Flex
          alignItems={{base: "flex-end", lg: "center"}}
          flex={0.5}
          justify="space-evenly"
          width={{base: "100%"}}
        >
          <a href="#">
            <Image
              height={12}
              src="https://icongr.am/material/facebook.svg?size=128&color=6b90e6"
              width={12}
            />
          </a>
          <a href="#">
            <Image
              height={12}
              src="https://icongr.am/material/instagram.svg?size=128&color=6b90e6"
              width={12}
            />
          </a>
          <a href="#">
            <Image
              height={12}
              src="https://icongr.am/material/twitter.svg?size=128&color=6b90e6"
              width={12}
            />
          </a>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Footer;
