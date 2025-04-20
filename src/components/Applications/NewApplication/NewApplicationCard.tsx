import { Card, Collapsible } from "@chakra-ui/react";
import { NewApplicationForm } from "./fragments/NewApplicationForm";

export const NewApplicationCard = (p: { courseId: string }) => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger
        _hover={{ cursor: "pointer", color: "gey.900" }}
        marginY="13px"
        data-testid="new-application-card-toggler"
      >
        Apply for this Course
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Card.Root p={5} shadow="md" borderRadius="md" width="100%">
          <Card.Body>
            <NewApplicationForm courseId={p.courseId} />
          </Card.Body>
        </Card.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
