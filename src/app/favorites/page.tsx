import { FavoritesList } from "@/components/Favorites/FavoritesList/FavoritesList";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { RemoveAllFavoritesBtn } from "../../components/Favorites/RemoveAllFavoritesBtn";

export default function FavoritesPage() {
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
      <Suspense fallback="...">
        <FavoritesList />
      </Suspense>
    </Box>
  );
}
