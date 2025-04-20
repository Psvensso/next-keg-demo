"use client";
import { Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import CategoryPickerSelect from "./fragments/CategoryPickerSelect";
import InstitutePickerSelect from "./fragments/InstitutePickerSelect";
import { FilterFormProvider, useFilterForm } from "./useFilterForm";

export const FilterForm = () => {
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
