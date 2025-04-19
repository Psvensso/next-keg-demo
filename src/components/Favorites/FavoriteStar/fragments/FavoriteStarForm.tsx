"use client";

import { Tooltip } from "@/components/ui/tooltip";

import { useActionState } from "react";
import { FavoriteStarSubmitBtn } from "./FavoriteStarSubmitBtn";

type TProps = {
  initialIsFavorite: boolean;
  toggleFavoriteAction: () => Promise<boolean>;
};

/** Client component with a form action */
export const FavoriteStarForm = ({
  initialIsFavorite,
  toggleFavoriteAction,
}: TProps) => {
  const [isFavorite, formAction] = useActionState(
    toggleFavoriteAction,
    initialIsFavorite
  );

  return (
    <form action={formAction}>
      <Tooltip content={`${isFavorite ? "Remove" : "Add"} favorite`}>
        <FavoriteStarSubmitBtn isFavorite={isFavorite} />
      </Tooltip>
    </form>
  );
};
