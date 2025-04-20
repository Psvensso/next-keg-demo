import { FavoritesList } from "@/components/Favorites/FavoritesList";
import prismaClient from "@/db/prismaClient";
import { Box, Flex } from "@chakra-ui/react";
import { RemoveAllFavoritesBtn } from "../../components/Favorites/RemoveAllFavoritesBtn";
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
        <RemoveAllFavoritesBtn />
      </Flex>
      <FavoritesList courses={favoriteCourses} />
    </Box>
  );
}
