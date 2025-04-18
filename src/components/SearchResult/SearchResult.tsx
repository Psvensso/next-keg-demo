import prisma from "@/utils/prisma";
import { Box } from "@chakra-ui/react";
import CourseSearchResultItem from "./fragments/CourseSearchResultItem";

// Removed client-only useParams; accept params via props

export interface SearchResultProps {
  category?: string | string[];
}

export const SearchResult = async ({ category }: SearchResultProps) => {
  const categories = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];

  const courses = await prisma.course.findMany({
    where: { category: { in: categories } },
  });

  return (
    <Box flex="1" display="flex" flexDir="column" m="16px" gap="8px">
      {courses?.map((c) => (
        <CourseSearchResultItem course={c} key={c.id} />
      ))}
    </Box>
  );
};
