import { FilterForm } from "@/components/Filters/FilterForm/FilterForm";
import { SaveFilterBtn } from "@/components/Filters/SaveFilterBtn/SaveFilterBtn";
import { SearchResult } from "@/components/SearchResult/SearchResult";
import { FilterParamsRecord } from "@/db/repos/filtersRepo";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function Home(p: {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  } & FilterParamsRecord>;
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
          <SaveFilterBtn searchParams={searchParams} />
          <FilterForm />
        </Box>
      </Suspense>
      <Box flex="1" overflow="auto">
        <Suspense fallback="Loading courses....">
          <SearchResult
            category={searchParams.category}
            page={searchParams.page}
            pageSize={searchParams.pageSize}
          />
        </Suspense>
      </Box>
    </Flex>
  );
}
