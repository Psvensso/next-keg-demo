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

interface Institute {
  instituteName: string;
  instituteNameSlug: string;
}

const InstitutePickerSelect = () => {
  const {
    filterState: { institute },
    updateFilterValue,
  } = useFilterFormContext();

  const optionsState = useAsync(async (): Promise<Institute[]> => {
    const response = await fetch("/api/courseMeta?type=institutes");
    const data = await response.json();
    return data;
  }, []);

  const collection = useMemo(() => {
    return createListCollection({
      items: optionsState.value ?? [],
      itemToString: (item: Institute) => item.instituteName,
      itemToValue: (item: Institute) => item.instituteNameSlug,
    });
  }, [optionsState.value]);

  const instituteValue = useMemo(() => {
    if (!institute) return [""];
    if (Array.isArray(institute)) return [institute[0] || ""];
    return [institute];
  }, [institute]);

  if (optionsState.error) {
    return <div>Error loading institutes</div>;
  }

  return (
    <Select.Root
      collection={collection}
      value={instituteValue}
      onValueChange={(value) => {
        updateFilterValue({
          institute: value.value[0],
        });
      }}
      size="sm"
      width="100%"
    >
      <Select.HiddenSelect />
      <Select.Label>Select institute</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select institute" />
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
            <Select.Item item="" key="all">
              All institutes
              <Select.ItemIndicator />
            </Select.Item>
            {collection.items.map((inst: Institute) => (
              <Select.Item
                item={inst.instituteNameSlug}
                key={inst.instituteNameSlug}
              >
                {inst.instituteName}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default InstitutePickerSelect;
