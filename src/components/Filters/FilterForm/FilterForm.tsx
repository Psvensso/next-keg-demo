"use client";
import { Flex } from "@chakra-ui/react";
import CategoryPickerSelect from "./fragments/CategoryPickerSelect";
import { FilterFormProvider, useFilterForm } from "./useFilterForm";

export const FilterForm = () => {
  const ctx = useFilterForm();

  return (
    <FilterFormProvider value={ctx}>
      <Flex
        direction="column"
        border="1px solid gray"
        borderRadius="1em"
        margin="12px"
        p="16px 6px"
      >
        <CategoryPickerSelect />
      </Flex>
    </FilterFormProvider>
  );
};
