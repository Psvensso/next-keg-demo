import { Box, Button, Card, Collapsible } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa6";
import { NewApplicationForm } from "./fragments/NewApplicationForm";

export const NewApplicationCard = (p: { courseId: string }) => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger
        _hover={{ cursor: "pointer", color: "grey.900" }}
        marginY="13px"
        as={"div"}
        data-testid="new-application-card-toggler"
      >
        <Button variant="surface" colorPalette="green">
          Apply for this Course{" "}
          <Box
            as="span"
            display="inline-block"
            transition="transform 0.2s"
            css={{
              '[data-state="open"] &': {
                transform: "rotate(90deg)",
              },
            }}
          >
            <FaChevronRight />
          </Box>
        </Button>
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
