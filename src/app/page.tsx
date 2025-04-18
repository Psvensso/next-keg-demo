import { Filters } from "@/components/Filters/Filters";
import { SearchResult } from "@/components/SearchResult/SearchResult";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category?: string | string[];
    page?: string;
    pageSize?: string;
  };
}) {
  const params = await searchParams;
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
          <Filters />
        </Box>
      </Suspense>
      <Box flex="1" overflow="auto">
        <Suspense fallback="Loading courses....">
          <SearchResult
            category={params.category}
            page={params.page}
            pageSize={params.pageSize}
          />
        </Suspense>
      </Box>
    </Flex>
  );
}
