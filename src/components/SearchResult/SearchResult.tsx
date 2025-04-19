import prismaClient from "@/utils/prisma/prismaClient";
import { Box } from "@chakra-ui/react";
import CourseCard from "../CourseCard";
import { SearchResultPagination } from "./fragments/SearchResultPagination";

export interface SearchResultProps {
  category?: string | string[];
  page?: string;
  pageSize?: string;
}

export const SearchResult = async ({
  category,
  page = "1",
  pageSize = "20",
}: SearchResultProps) => {
  const categories = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];

  const currentPage = parseInt(page, 10);
  const itemsPerPage = parseInt(pageSize, 10);

  // Calculate skip value for pagination
  const skip = (currentPage - 1) * itemsPerPage;

  // Get courses with pagination
  const courses = await prismaClient.course.findMany({
    where: { category: { in: categories.length > 0 ? categories : undefined } },
    skip,
    take: itemsPerPage,
  });

  // Get total count for pagination
  const totalCount = await prismaClient.course.count({
    where: { category: { in: categories.length > 0 ? categories : undefined } },
  });

  return (
    <Box flex="1" display="flex" flexDir="column" m="16px" gap="8px">
      {courses?.map((c) => (
        <CourseCard course={c} key={c.id} />
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
