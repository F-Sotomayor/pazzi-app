import React from "react";
import {Box, Flex, Stack, Image, Text} from "@chakra-ui/core";

const Footer = () => {
  return (
    <Stack
      backgroundColor="gray.50"
      height={{base: "40vh", lg: "15vh"}}
      marginTop={8}
      padding={4}
      width="100%"
    >
      <Flex
        align="center"
        direction={{base: "column", lg: "row"}}
        height="100%"
        justify="space-between"
        width="100%"
      >
        <Flex align="flex-start" direction="column" flex={0.5} height="100%" justify="space-evenly">
          <Flex
            direction={{base: "column", lg: "row"}}
            flex={{base: 1, lg: 0.5}}
            height="100%"
            justify={{base: "space-between", lg: "space-evenly"}}
            width="100%"
          >
            <Flex alignItems="center" height="100%">
              <a href="#" style={{display: "flex", alignItems: "center"}}>
                <Image
                  height={12}
                  src="https://icongr.am/material/phone.svg?size=128&color=6b90e6"
                  width={12}
                />
                <Text fontSize={20} marginLeft={4}>
                  +54 1123466299
                </Text>
              </a>
            </Flex>
            <Flex alignItems="center" height="100%" marginTop={{base: "2rem", lg: 0}}>
              <a href="#" style={{display: "flex", alignItems: "center"}}>
                <Image
                  height={12}
                  src="https://icongr.am/material/email-receive-outline.svg?size=128&color=6b90e6"
                  width={12}
                />
                <Text fontSize={20} marginLeft={4}>
                  tuemail@tuemail.com
                </Text>
              </a>
            </Flex>
          </Flex>
        </Flex>
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
