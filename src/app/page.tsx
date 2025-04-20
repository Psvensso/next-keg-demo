import { SearchResult } from "@/components/Courses/SearchResult/SearchResult";
import { FilterForm } from "@/components/Filters/FilterForm/FilterForm";
import { SavedFiltersSelector } from "@/components/Filters/SavedFiltersSelector/SavedFiltersSelector";
import { SaveFilterBtn } from "@/components/Filters/SaveFilterBtn/SaveFilterBtn";
import { FilterParamsRecord } from "@/db/filterTypes";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function Home(p: {
  searchParams: Promise<
    {
      page?: string;
      pageSize?: string;
    } & FilterParamsRecord
  >;
}) {
  const searchParams = await p.searchParams;
  return (
    <Flex>
      <Suspense fallback="...">
        <Box
          position="sticky"
          top="45px"
          height="calc(100vh - 45px)"
          overflow="auto"
          hideBelow="md"
          width={{
            lg: 350,
            base: 250,
          }}
        >
          <Box
            border="1px solid gray"
            borderRadius="1em"
            margin="12px"
            p="16px 6px"
          >
            <Flex gap="6px">
              <SaveFilterBtn />
              <SavedFiltersSelector />
            </Flex>
            <FilterForm />
          </Box>
        </Box>
      </Suspense>
      <Box flex="1" overflow="auto">
        <Suspense fallback="Loading courses....">
          <SearchResult
            filterParams={searchParams}
            page={searchParams.page}
            pageSize={searchParams.pageSize}
          />
        </Suspense>
      </Box>
    </Flex>
  );
}
