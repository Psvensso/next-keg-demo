import prisma from "@/utils/prisma";

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

  return <div>{courses?.length}</div>;
};
