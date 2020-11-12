import {AppProps} from "next/app";
import React from "react";
import {ChakraProvider} from "@chakra-ui/core";

import theme from "../theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => (
  <ChakraProvider resetCSS theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
