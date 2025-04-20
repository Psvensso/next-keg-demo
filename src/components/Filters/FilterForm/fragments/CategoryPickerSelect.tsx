"use client";
import {
  createListCollection,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useMemo } from "react";

import { useAsync } from "react-use";
import { useFilterFormContext } from "../useFilterForm";

interface Category {
  category: string;
}

const CategoryPickerSelect = () => {
  const {
    filterState: { category },
    updateFilterValue,
  } = useFilterFormContext();

  const optionsState = useAsync(async (): Promise<Category[]> => {
    const response = await fetch("/api/courseMeta?type=categories");
    const data = await response.json();
    return data;
  }, []);

  const collection = useMemo(() => {
    return createListCollection({
      items: optionsState.value ?? [],
    });
  }, [optionsState.value]);

  const arrayCategoryValue = useMemo(() => {
    if (!category) {
      return [];
    }
    if (Array.isArray(category)) {
      return category;
    }
    return [category];
  }, [category]);

  if (optionsState.error) {
    return <div>Error loading categories</div>;
  }
  return (
    <Select.Root
      multiple
      collection={collection}
      value={arrayCategoryValue}
      onValueChange={(value) => {
        updateFilterValue({
          page: "1",
          category: value.value,
        });
      }}
      size="sm"
      width="100%"
    >
      <Select.HiddenSelect />
      <Select.Label>Select category</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select category" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {optionsState.loading && (
            <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
          )}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((cat) => (
              <Select.Item item={cat.category} key={cat.category}>
                {cat.category}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default CategoryPickerSelect;
