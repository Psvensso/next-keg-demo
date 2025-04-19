"use client";
import { Flex } from "@chakra-ui/react";
import CategoryPickerSelect from "./fragments/CategoryPickerSelect";
import { FilterFormProvider, useFilterForm } from "./useFilterForm";

export const FilterForm = () => {
  const ctx = useFilterForm();

  return (
    <FilterFormProvider value={ctx}>
      <Flex direction="column">
        <CategoryPickerSelect />
      </Flex>
    </FilterFormProvider>
  );
};
