"use client";

import { okFilterParams } from "@/db/filterTypes";
import { Button, Flex, Input, Popover, Portal } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

interface SaveFilterPopoverProps {
  serverAction: (formData: FormData) => Promise<{ success: boolean }>;
}

export const SaveFilterPopover = ({ serverAction }: SaveFilterPopoverProps) => {
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef(null);

  const searchParamsAsString = useMemo(() => {
    return Object.keys(okFilterParams)
      .reduce((acc, okKey) => {
        params.getAll(okKey).forEach((val) => acc.set(okKey, val));
        return acc;
      }, new URLSearchParams())
      .toString();
  }, [params]);

  const handleOpenChange = (details: { open: boolean }) => {
    setOpen(details.open);
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await serverAction(formData);
    if (result.success) {
      setOpen(false);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <form action={handleSubmit}>
                <Popover.Title fontWeight="medium">
                  Save filter as
                </Popover.Title>
                <Flex gap="6px">
                  <input
                    type="hidden"
                    name="filterValue"
                    value={searchParamsAsString}
                  />
                  <Input
                    ref={initialFocusRef}
                    name="filterName"
                    placeholder="Filter name"
                    size="sm"
                    required
                  />
                  <Button type="submit" size="sm" variant="outline">
                    Save
                  </Button>
                </Flex>
              </form>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
