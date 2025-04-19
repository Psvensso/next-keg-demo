import {
  getFavorite,
  toggleFavorite,
} from "@/utils/prisma/repos/favoritesRepo";
import { FavoriteStarForm } from "./fragments/FavoriteStarForm";

/** Server component loading state and the initial data */
export async function FavoriteStar({ courseId }: { courseId: string }) {
  const isFavorite = await getFavorite(courseId);

  const toggleFavoriteAction = async () => {
    "use server";
    await toggleFavorite(courseId);
    return !isFavorite;
  };

  return (
    <FavoriteStarForm
      initialIsFavorite={isFavorite}
      toggleFavoriteAction={toggleFavoriteAction}
    />
  );
}
