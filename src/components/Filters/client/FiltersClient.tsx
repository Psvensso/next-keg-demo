"use client";
import { Box, Flex } from "@chakra-ui/react";
import CategoryPickerSelect from "./fragments/CategoryPickerSelect";
import { FiltersClientProvider, useFiltersClient } from "./useFiltersClient";

export type TFiltersClientProps = {
  courseCount: number;
};

export const FiltersClient = (p: TFiltersClientProps) => {
  const { courseCount } = p;
  const ctx = useFiltersClient();

  return (
    <FiltersClientProvider value={ctx}>
      <Flex
        direction="column"
        border="1px solid gray"
        borderRadius="1em"
        margin="12px"
        p="16px 6px"
      >
        <Box p="12px">Total courses: {courseCount}</Box>
        <CategoryPickerSelect />
      </Flex>
    </FiltersClientProvider>
  );
};
