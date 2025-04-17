"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function Provider(props: PropsWithChildren) {
  return (
    <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
  );
}
