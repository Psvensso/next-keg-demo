"use client";
import { IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa6";

type TProps = {
  filterId: string;
  deleteAction: (
    formData: FormData
  ) => Promise<{ success: boolean; error?: string }>;
};

export function DeleteFilterBtn({ filterId, deleteAction }: TProps) {
  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("filterId", filterId);

    try {
      await deleteAction(formData);
      // The page will automatically revalidate after the server action
    } catch (error) {
      console.error("Error deleting filter:", error);
    }
  };

  return (
    <IconButton
      aria-label="Delete filter"
      size="xs"
      variant="ghost"
      _hover={{ colorPalette: "red" }}
      onClick={handleDelete}
    >
      <FaTrash />
    </IconButton>
  );
}
