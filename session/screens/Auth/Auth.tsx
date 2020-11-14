import React from "react";
import {Flex} from "@chakra-ui/core";

import LoginScreen from "./Login";
import ResetPasswordScreen from "./ResetPassword";

const AuthScreen: React.FC = () => {
  const [screen, setScreen] = React.useState("login");

  return (
    <Flex
      alignItems="center"
      backgroundColor={{base: "white", sm: "primary.600"}}
      flex={1}
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      padding={{base: 0, sm: 8}}
    >
      <Flex
        alignItems="center"
        backgroundColor="white"
        direction="column"
        maxWidth={{base: "100%", sm: 400}}
        padding={8}
        rounded="lg"
        shadow={{base: "none", sm: "md"}}
        width="100%"
      >
        {screen === "login" && <LoginScreen navigate={setScreen} />}
        {screen === "reset" && <ResetPasswordScreen navigate={setScreen} />}
      </Flex>
    </Flex>
  );
};

export default AuthScreen;
