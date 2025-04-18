import { Course } from "@/utils/generated/prisma/client";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

const CourseSearchResultItem = ({
  course: {
    courseName,
    instituteName,
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
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
      <Stack>
        <Heading size="md">{courseName}</Heading>
        <Text fontSize="sm" color="gray.600">
          {instituteName}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Category: {category}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Delivery: {deliveryMethod}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Location: {location}
        </Text>
        {language && (
          <Text fontSize="sm" color="gray.600">
            Language: {language}
          </Text>
        )}
        <Text fontSize="sm" color="gray.600">
          Start Date: {new Date(startDate).toLocaleDateString()}
        </Text>
      </Stack>
    </Box>
  );
};

export default CourseSearchResultItem;
