import { createFilter, FilterParamsRecord } from "@/db/repos/filtersRepo";
import { Button, Flex, Input, Popover, Portal } from "@chakra-ui/react";

export const SaveFilterBtn = async ({
  searchParams,
}: {
  searchParams: FilterParamsRecord;
}) => {
  const searchParamsAsString = JSON.stringify(searchParams);

  const serverActionCreateFilter = async (formData: FormData) => {
    "use server";
    const filterName = formData.get("filterName");
    if (!filterName || typeof filterName !== "string") {
      throw new Error("Bad name"); //Should never, its required
    }

    await createFilter(filterName, searchParamsAsString);
  };

  return (
    <Popover.Root>
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
              <form action={serverActionCreateFilter}>
                <Popover.Title fontWeight="medium">
                  Save filter as
                </Popover.Title>
                <Flex gap="6px">
                  <Input
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
