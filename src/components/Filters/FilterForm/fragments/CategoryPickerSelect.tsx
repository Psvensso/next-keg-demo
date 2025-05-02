"use client";
import {
  createListCollection,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useAsync, useLocalStorage } from "react-use";
import { useFilterFormContext } from "../useFilterForm";

const CATEGORIES_LOCAL_STORAGE_KEY = "KEG-categories";

interface Category {
  category: string;
}

const CategoryPickerSelect = () => {
  const {
    filterState: { category },
    updateFilterValue,
  } = useFilterFormContext();

  const [categoriesStateCache, setCategoriesCache] = useLocalStorage<
    Category[]
  >(CATEGORIES_LOCAL_STORAGE_KEY);
  const optionsState = useAsync(async (): Promise<Category[]> => {
    if (categoriesStateCache) {
      return Promise.resolve(categoriesStateCache);
    }

    const response = await fetch("/api/courseMeta?type=categories");
    const data = await response.json();
    setCategoriesCache(data);
    return data;
  }, [categoriesStateCache]);

  const collection = useMemo(() => {
    return createListCollection({
      items: (optionsState.value ?? []).map((cat) => cat.category),
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
          category: value.value,
        });
      }}
      size="sm"
      width="100%"
    >
      <Select.HiddenSelect />
      <Select.Label>Category</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="All categories" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {optionsState.loading && (
            <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
          )}
          <Select.Indicator />
          <Select.ClearTrigger />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((cat) => (
              <Select.Item item={cat} key={cat}>
                {cat}
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
