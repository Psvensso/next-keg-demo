"use client";
import { Button, Spinner } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";

/** Client component that sits below the form to be able to use the useFormStatus */
export function FavoriteStarSubmitBtn({ isFavorite }: { isFavorite: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
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
