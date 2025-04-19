import { FavoriteStar } from "@/components/Favorites/FavoriteStar";
import { Course } from "@/utils/prisma/generated";
import { Badge, Box, Card, HStack, Text } from "@chakra-ui/react";
import { Suspense } from "react";

const CourseCard = ({
  course: {
    courseName,
    instituteName,
    category,
    deliveryMethod,
    location,
    language,
    startDate,
    id,
  },
}: {
  course: Course;
}) => {
  return (
    <Card.Root flexDirection="row" overflow="hidden" mb={4} boxShadow="sm">
      <Box flex="1">
        <Card.Body>
          <Card.Title fontSize="lg" mb="1">
            {courseName}
          </Card.Title>
          <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={2}>
            {instituteName}
          </Text>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Location: {location}
          </Text>
          {language && (
            <Text fontSize="sm" color="gray.600" mb={1}>
              Language: {language}
            </Text>
          )}
          <Text fontSize="sm" color="gray.600" mb={3}>
            Start Date: {new Date(startDate).toLocaleDateString()}
          </Text>
          <HStack mt="2">
            <Badge colorScheme="blue">{category}</Badge>
            <Badge colorScheme="green">{deliveryMethod}</Badge>
          </HStack>
          <Suspense>
            <FavoriteStar courseId={id} />
          </Suspense>
        </Card.Body>
      </Box>
    </Card.Root>
  );
};

export default CourseCard;
