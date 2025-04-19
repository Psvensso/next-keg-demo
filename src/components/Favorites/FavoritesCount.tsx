import { getFavorites } from "@/utils/prisma/repos/favoritesRepo";
import { Box } from "@chakra-ui/react";

export const FavoritesCount = async () => {
  const favorites = await getFavorites();
  return <Box mx="6px">{favorites?.length}</Box>;
};
