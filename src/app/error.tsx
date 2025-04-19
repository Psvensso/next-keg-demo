"use client";

import { Box, Button, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect } from "react";

// The error.tsx client component receives error and reset props
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const errorMessage = error.message || "An unexpected error occurred";

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.500, blue.500)"
        backgroundClip="text"
      >
        Error Occurred
      </Heading>
      <Text fontSize="18px" mt={3} mb={2} fontWeight="bold">
        Something went wrong
      </Text>
      <Text color={"gray.500"} mb={6}>
        {errorMessage}
      </Text>

      <Box display="flex" justifyContent="center" gap={4}>
        <Button
          onClick={reset}
          colorScheme="teal"
          bgGradient="linear(to-r, teal.500, blue.500)"
          color="white"
          variant="solid"
        >
          Try again
        </Button>

        <NextLink href="/" passHref>
          <Button colorScheme="gray" variant="outline">
            Go to Home
          </Button>
        </NextLink>
      </Box>
    </Box>
  );
}
