"use client";
import { Button, Spinner } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";

export function FavoriteStarSubmitBtn({ isFavorite }: { isFavorite: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      data-testid="favorites-toggle-btn"
      variant="plain"
      type="submit"
      colorPalette="teal"
      disabled={pending}
    >
      {pending ? (
        <Spinner size="sm" />
      ) : isFavorite ? (
        <FaStar />
      ) : (
        <FaRegStar />
      )}
    </Button>
  );
}
