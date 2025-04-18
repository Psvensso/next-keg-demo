import { Filters } from "@/components/Filters/Filters";
import { SearchResult } from "@/components/SearchResult/SearchResult";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string | string[] };
}) {
  const params = await searchParams;
  return (
    <>
      <Box display="flex">
        <Suspense fallback="...">
          <Box width="350px">
            <Filters />
          </Box>
        </Suspense>
        <Suspense fallback="Loading courses....">
          <SearchResult category={params.category} />
        </Suspense>
      </Box>
    </>
  );
}
