import { FilterParamsRecord } from "@/db/filterTypes";
import prismaClient from "@/db/prismaClient";
import { Box } from "@chakra-ui/react";
import CourseListCard from "../CourseListCard";
import { SearchResultPagination } from "./fragments/SearchResultPagination";

export interface SearchResultProps {
  filterParams?: Partial<FilterParamsRecord>;
  page?: string;
  pageSize?: string;
}

export const SearchResult = async ({
  filterParams = {},
  page = "1",
  pageSize = "20",
}: SearchResultProps) => {
  const { category, institute } = filterParams;

  const categories = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];

  const institutes = Array.isArray(institute)
    ? institute
    : institute
    ? [institute]
    : [];

  const currentPage = parseInt(page, 10);
  const itemsPerPage = parseInt(pageSize, 10);

  // Calculate skip value for pagination
  const skip = (currentPage - 1) * itemsPerPage;

  // Get courses with pagination
  const courses = await prismaClient.course.findMany({
    where: {
      category: { in: categories.length > 0 ? categories : undefined },
      instituteNameSlug: { in: institutes.length > 0 ? institutes : undefined },
    },
    skip,
    take: itemsPerPage,
  });

  // Get total count for pagination
  //Todo: Make this dry
  const totalCount = await prismaClient.course.count({
    where: {
      category: { in: categories.length > 0 ? categories : undefined },
      instituteName: { in: institutes.length > 0 ? institutes : undefined },
    },
  });

  return (
    <Box flex="1" display="flex" flexDir="column" m="16px" gap="8px">
      {courses?.map((c) => (
        <CourseListCard course={c} key={c.id} />
      ))}

      <Box mt={4} display="flex" justifyContent="center">
        <SearchResultPagination
          totalCount={totalCount}
          pageSize={itemsPerPage}
          currentPage={currentPage}
        />
      </Box>
    </Box>
  );
};
