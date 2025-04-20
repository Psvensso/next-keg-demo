import { FavoriteStar } from "@/components/Favorites/FavoriteStar/FavoriteStar";
import { Course } from "@/db/generated";
import { Badge, Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { Suspense } from "react";

type TProps = {
  course: Course;
};

const CourseDetailsCard = ({ course }: TProps) => {
  // Format the start date
  const formattedDate = format(course.startDate, "MMMM d, yyyy");

  return (
    <>
      <Box p={6} boxShadow="md" borderRadius="lg" bg="bg.surface">
        <Flex
          justifyContent="space-between"
          alignItems="flex-start"
          mb={4}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          gap={4}
        >
          <Box maxW="full">
            <Flex alignItems="center" flexWrap="wrap" gap={3} mb={2}>
              <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                data-testid="course-details-card-title"
              >
                {course.courseName}
              </Heading>
              <Suspense fallback={<Box w="6" h="6" />}>
                <FavoriteStar courseId={course.id} />
              </Suspense>
            </Flex>
            <Text fontSize="lg" color="text.subtle">
              {course.instituteName}
            </Text>
          </Box>
          <Badge colorPalette="blue" size="lg" p={2} flexShrink={0}>
            {course.category}
          </Badge>
        </Flex>
        <Box borderBottomWidth="1px" borderColor="border.subtle" my={4} />
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          mt={4}
        >
          <Stack gap={4}>
            <Box>
              <Text fontWeight="medium" color="text.subtle">
                Delivery Method
              </Text>
              <Text fontSize="lg">{course.deliveryMethod}</Text>
            </Box>

            <Box>
              <Text fontWeight="medium" color="text.subtle">
                Location
              </Text>
              <Text fontSize="lg">{course.location}</Text>
            </Box>
          </Stack>
          <Stack gap={4}>
            <Box>
              <Text fontWeight="medium" color="text.subtle">
                Language
              </Text>
              <Text fontSize="lg">{course.language || "Not specified"}</Text>
            </Box>
            <Box>
              <Text fontWeight="medium" color="text.subtle">
                Start Date
              </Text>
              <Text fontSize="lg">{formattedDate}</Text>
            </Box>
          </Stack>
        </Grid>
        <Box mt={8}>
          <Heading as="h3" size="md" mb={3}>
            Course Details
          </Heading>
          <Text>
            This is a {course.category} course offered by {course.instituteName}
            . The course is delivered via {course.deliveryMethod.toLowerCase()}
            {course.location ? ` in ${course.location}` : ""}.
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default CourseDetailsCard;
