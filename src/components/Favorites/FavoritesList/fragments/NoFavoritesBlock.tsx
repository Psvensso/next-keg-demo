import { Button, Center, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaRegStar } from "react-icons/fa6";

export const NoFavoritesBlock = () => {
  return (
    <Center flex="1" data-testid="favorites-list-empty" height="100%" py={12}>
      <VStack gap={6} maxW="md" textAlign="center" px={4}>
        <FaRegStar />
        <Text fontSize="2xl" fontWeight="bold">
          No favorites yet
        </Text>
        <Text color="gray.600">
          You haven&apos;t added any courses to your favorites yet. Find
          interesting courses and mark them with a star to add them to this
          list.
        </Text>
        <NextLink href="/" passHref>
          <Button colorPalette="orange" size="lg" mt={4}>
            Browse Courses
          </Button>
        </NextLink>
      </VStack>
    </Center>
  );
};
