import * as React from "react";
import {
  ChakraProvider,
  // Box,
  // Text,
  // Link,
  // VStack,
  // Code,
  // Grid,
  theme,
} from "@chakra-ui/react";
import EmailEditorComp from "./components/EmailEditorComp";

export const App = () => (
  <ChakraProvider theme={theme}>
    <EmailEditorComp />
  </ChakraProvider>
);
