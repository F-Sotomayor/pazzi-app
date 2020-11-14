import {AppProps} from "next/app";
import React from "react";
import {ChakraProvider} from "@chakra-ui/core";

import theme from "../theme";
import {Provider as SessionProvider} from "../session/context";

const App: React.FC<AppProps> = ({Component, pageProps}) => (
  <ChakraProvider resetCSS theme={theme}>
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  </ChakraProvider>
);

export default App;
