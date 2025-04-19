import { getFavorites } from "@/db/repos/favoritesRepo";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export const FavoritesNavBtn = async (p: { to: string }) => {
  const favorites = await getFavorites();
  return (
    <Link href={p.to} style={{ textDecoration: "none" }}>
      <Button variant="outline" size="sm">
        Favorites {favorites?.length}{" "}
      </Button>
    </Link>
  );
};
