import { Course } from "@/db/generated";
import { Badge, Box, Card, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

const CourseListCard = ({
  course: {
    courseName,
    instituteName,
    instituteNameSlug,
    courseNameSlug,
    category,
    deliveryMethod,
    location,
    language,
    startDate,
  },
}: {
  course: Course;
}) => {
  return (
    <Link
      href={`/in/${instituteNameSlug}/${courseNameSlug}`}
      style={{ textDecoration: "none" }}
    >
      <Card.Root
        data-testid="course-list-card"
        flexDirection="row"
        overflow="hidden"
        mb={4}
        boxShadow="sm"
        cursor="pointer"
        _hover={{ boxShadow: "md" }}
        transition="box-shadow 0.2s"
      >
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
          </Card.Body>
        </Box>
      </Card.Root>
    </Link>
  );
};

export default CourseListCard;
