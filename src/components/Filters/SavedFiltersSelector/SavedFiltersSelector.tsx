import { deleteFilter, getFilters } from "@/db/repos/filtersRepo";
import { Box, Button, Flex, Popover, Portal } from "@chakra-ui/react";
import Link from "next/link";
import { DeleteFilterBtn } from "./fragments/DeleteFilterBtn";

// Server action for delete
async function deleteFilterAction(formData: FormData) {
  "use server";

  const filterId = formData.get("filterId");
  if (!filterId || typeof filterId !== "string") {
    return { success: false, error: "Invalid filter ID" };
  }

  try {
    await deleteFilter(filterId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting filter:", error);
    return { success: false, error: "Failed to delete filter" };
  }
}

export const SavedFiltersSelector = async () => {
  const filters = await getFilters();
  if (filters.length === 0) {
    return null;
  }
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="2xs" variant="outline">
          Saved filters
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Title fontWeight="medium">
                Select a saved filter
              </Popover.Title>
              {filters?.map((f) => {
                const urlPath = "/?" + new URLSearchParams(f.filter).toString();
                return (
                  <Flex
                    key={f.id}
                    overflow="hidden"
                    gap="12px"
                    justifyContent="space-between"
                    alignItems="center"
                    my="12px"
                  >
                    <Box _hover={{ color: "blue" }}>
                      <Link href={urlPath}>{f.name}</Link>
                    </Box>
                    <DeleteFilterBtn
                      filterId={f.id}
                      deleteAction={deleteFilterAction}
                    />
                  </Flex>
                );
              })}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
