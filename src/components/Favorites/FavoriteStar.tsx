import {
  getFavorite,
  toggleFavorite,
} from "@/utils/prisma/repos/favoritesRepo";
import { Button } from "@chakra-ui/react";

import { FaRegStar, FaStar } from "react-icons/fa6";
import { Tooltip } from "../ui/tooltip";

type TProps = { courseId: string };

export const FavoriteStar = async (p: TProps) => {
  const { courseId } = p;
  const isFavorite = await getFavorite(courseId);
  const doActionToggleFavorite = async () => {
    "use server";
    await toggleFavorite(courseId);
  };

  return (
    <form action={doActionToggleFavorite}>
      <Tooltip content={`${isFavorite ? "Add" : "Remove"} favorite`}>
        <Button variant="plain" type="submit" colorPalette="teal">
          {isFavorite ? <FaStar /> : <FaRegStar />}
        </Button>
      </Tooltip>
    </form>
  );
};
