import { FilterForm } from "@/components/Filters/FilterForm/FilterForm";
import { SearchResult } from "@/components/SearchResult/SearchResult";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function Home(p: {
  searchParams: Promise<{
    category?: string | string[];
    page?: string;
    pageSize?: string;
  }>;
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
