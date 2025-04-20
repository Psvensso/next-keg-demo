"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export const SearchResultPagination = ({
  totalCount,
  pageSize,
  currentPage,
}: {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (details: { page: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", details.page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination.Root
      count={totalCount}
      pageSize={pageSize}
      page={currentPage}
      defaultPage={1}
      onPageChange={handlePageChange}
    >
      <ButtonGroup variant="outline" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Previous page">
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              aria-label={`Page ${page.value}`}
              variant={{ base: "outline", _selected: "solid" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Next page">
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};
