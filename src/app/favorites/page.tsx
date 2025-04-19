import CourseCard from "@/components/CourseCard";
import { FavoriteStar } from "@/components/Favorites/FavoriteStar/FavoriteStar";
import prismaClient from "@/utils/prisma/prismaClient";
import { Box, Flex } from "@chakra-ui/react";

export default async function FavoritesPage() {
  const favoriteCourses = await prismaClient.course.findMany({
    where: {
      favorites: {
        some: {
          userId: "ME",
        },
      },
    },
  });

  return (
    <Box flex="1" display="flex" flexDir="column" m="16px" gap="8px">
      {favoriteCourses?.map((c) => (
        <Flex key={c.id}>
          <Flex direction="column" m="12px" alignContent="center">
            Remove
            <FavoriteStar courseId={c.id} />
          </Flex>
          <Box flex="1">
            <CourseCard course={c} />
          </Box>
        </Flex>
      ))}
    </Box>
  );
}
