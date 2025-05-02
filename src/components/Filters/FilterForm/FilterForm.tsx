"use client";
import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FilterFormProvider, useFilterForm } from "./useFilterForm";

const CategoryPickerSelect = dynamic(
  () => import("./fragments/CategoryPickerSelect"),
  {
    ssr: false,
    loading: () => (
      <Box p={4} textAlign="center">
        <Spinner size="md" />
      </Box>
    ),
  }
);

const InstitutePickerSelect = dynamic(
  () => import("./fragments/InstitutePickerSelect"),
  {
    ssr: false,
    loading: () => (
      <Box p={4} textAlign="center">
        <Spinner size="md" />
      </Box>
    ),
  }
);

const FilterForm = () => {
  const ctx = useFilterForm();

  return (
    <FilterFormProvider value={ctx}>
      <VStack mt="12px" gap={2} align="stretch">
        <Link href="/">
          <Button variant="subtle" size="2xs">
            Clear
          </Button>
        </Link>
        <CategoryPickerSelect />
        <InstitutePickerSelect />
      </VStack>
    </FilterFormProvider>
  );
};

export default FilterForm;
