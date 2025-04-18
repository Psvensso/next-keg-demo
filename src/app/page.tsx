import { Filters } from "@/components/Filters/Filters";
import { SearchResult } from "@/components/SearchResult/SearchResult";
import { HStack } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string | string[] };
}) {
  const params = await searchParams;
  return (
    <>
      <HStack>
        <Suspense fallback="...">
          <Filters />
        </Suspense>
        <Suspense fallback="Loading courses....">
          <SearchResult category={params.category} />
        </Suspense>
      </HStack>
    </>
  );
}
