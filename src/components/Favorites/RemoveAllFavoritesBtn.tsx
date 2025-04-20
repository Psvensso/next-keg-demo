import { removeAllFavorites } from "@/db/repos/favoritesRepo";
import { Button } from "@chakra-ui/react";

export const RemoveAllFavoritesBtn = async () => {
  return (
    <form action={removeAllFavorites}>
      <Button
        size="2xs"
        type="submit"
        variant="subtle"
        _hover={{ colorPalette: "red" }}
        data-testid="remove-all-favorites-btn"
      >
        Remove all
      </Button>
    </form>
  );
};
