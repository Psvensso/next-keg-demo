import { getApplications } from "@/db/repos/applicationsRepo";
import {
  Badge,
  Box,
  Card,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

export const ListApplications = async () => {
  const applications = await getApplications();
  return (
    <VStack gap={4} align="stretch" width="100%">
      {applications.map((application) => (
        <Card.Root
          key={application.id}
          shadow="md"
          borderRadius="lg"
          overflow="hidden"
          transition="all 0.3s"
        >
          <Card.Header>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading size="md">{application.courseDescription}</Heading>
              <Badge colorScheme="blue">
                {formatDistanceToNow(new Date(application.createdAt), {
                  addSuffix: true,
                })}
              </Badge>
            </HStack>
          </Card.Header>
          <Box borderBottomWidth="1px" />
          <Card.Body>
            <Stack gap={3}>
              <HStack>
                <Text fontWeight="bold" width="100px">
                  Applicant:
                </Text>
                <Text>{application.userName}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" width="100px">
                  Email:
                </Text>
                <Text>{application.userEmail}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" width="100px">
                  Phone:
                </Text>
                <Text>{application.userPhone}</Text>
              </HStack>
              <Box mt={2}>
                <Text fontWeight="bold" mb={1}>
                  Application Note:
                </Text>
                <Box p={3} bg="gray.50" borderRadius="md">
                  <Text>{application.applicationText}</Text>
                </Box>
              </Box>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Text fontSize="sm" color="gray.500">
              Application ID: {application.id.substring(0, 8)}...
            </Text>
          </Card.Footer>
        </Card.Root>
      ))}
    </VStack>
  );
};
