import CourseCard from "@/components/CourseCard";
import { FavoriteStar } from "@/components/Favorites/FavoriteStar/FavoriteStar";
import prismaClient from "@/db/prismaClient";
import { Box, Button, Flex } from "@chakra-ui/react";
import { NoFavoritesBlock } from "./fragments/NoFavoritesBlock";

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

  // If no favorites are present, display a nicer UI
  if (favoriteCourses.length === 0) {
    return <NoFavoritesBlock />;
  }

  return (
    <Box
      flex="1"
      display="flex"
      flexDir="column"
      m="16px"
      gap="8px"
      data-testid="favorites-list"
    >
      <Flex justifyContent="flex-end">
        <Button size="2xs" variant="subtle" _hover={{ colorPalette: "red" }}>
          Remove all
        </Button>
      </Flex>
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
