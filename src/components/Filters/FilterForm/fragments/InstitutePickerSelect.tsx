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

interface Institute {
  instituteName: string;
  instituteNameSlug: string;
}
const LOCAL_STORAGE_KEY = "KEG-institutes";
const InstitutePickerSelect = () => {
  const {
    filterState: { institute },
    updateFilterValue,
  } = useFilterFormContext();
  const [institutesStateCache, setInstitutesCache] =
    useLocalStorage<Institute[]>(LOCAL_STORAGE_KEY);

  const optionsState = useAsync(async (): Promise<Institute[]> => {
    if (institutesStateCache) {
      return Promise.resolve(institutesStateCache);
    }
    const response = await fetch("/api/courseMeta?type=institutes");
    const data = await response.json();
    setInstitutesCache(data);
    return data;
  }, [institutesStateCache]);

  const collection = useMemo(() => {
    return createListCollection({
      items: institutesStateCache ?? [],
      itemToString: (item: Institute) => item.instituteName,
      itemToValue: (item: Institute) => item.instituteNameSlug,
    });
  }, [institutesStateCache]);

  const instituteValue = useMemo(() => {
    if (!institute) return [];
    if (Array.isArray(institute)) return institute;
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
          institute: value.value,
        });
      }}
      multiple
      size="sm"
      width="100%"
    >
      <Select.HiddenSelect />
      <Select.Label>Institute</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="All institutes" />
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
