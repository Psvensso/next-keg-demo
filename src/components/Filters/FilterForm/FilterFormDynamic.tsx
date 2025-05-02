"use client";
import { Box, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const FilterForm = dynamic(() => import("./FilterForm"), {
  ssr: false,
  loading: () => (
    <Box p={4} textAlign="center">
      <Spinner size="md" />
    </Box>
  ),
});

export const FilterFormDynamic = () => {
  return <FilterForm />;
};
