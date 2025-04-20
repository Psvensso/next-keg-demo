"use client";

import { toaster } from "@/components/ui/toaster";
import { submitApplication } from "@/db/repos/submitApplication";
import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";

interface NewApplicationFormProps {
  courseId: string;
}

export const NewApplicationForm = ({ courseId }: NewApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;

    if (!firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Add the courseId to the form data
      formData.append("courseId", courseId);

      const result = await submitApplication(formData);

      if (result.success) {
        toaster.success({
          title: "Application submitted",
          description: result.message,
        });

        formRef.current?.reset();
      } else {
        toaster.error({
          title: "Error",
          description: result.message,
        });
      }
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      data-testid="new-application-form"
      action={handleSubmit}
    >
      <Stack gap="4" direction="column">
        <Text fontStyle="italic">
          Please note: This form expresses your interest in this type of course
          rather than submitting a formal application. A student advisor will
          contact you to discuss the complete application process. <br />
          Please check the{" "}
          <Link href="/applications">
            <u>applications</u>
          </Link>{" "}
          for earlier made applications.
        </Text>
        <HStack gap="4">
          <Field.Root invalid={!!errors.firstName}>
            <Field.Label>
              First Name{" "}
              <Text as="span" color="red.500">
                *
              </Text>
            </Field.Label>
            <Input
              name="firstName"
              placeholder="Enter your first name"
              onChange={() =>
                errors.firstName && setErrors({ ...errors, firstName: "" })
              }
            />
            {errors.firstName && (
              <Text color="red.500" fontSize="sm">
                {errors.firstName}
              </Text>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.lastName}>
            <Field.Label>
              Last Name{" "}
              <Text as="span" color="red.500">
                *
              </Text>
            </Field.Label>
            <Input
              name="lastName"
              placeholder="Enter your last name"
              onChange={() =>
                errors.lastName && setErrors({ ...errors, lastName: "" })
              }
            />
            {errors.lastName && (
              <Text color="red.500" fontSize="sm">
                {errors.lastName}
              </Text>
            )}
          </Field.Root>
        </HStack>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>
            Email{" "}
            <Text as="span" color="red.500">
              *
            </Text>
          </Field.Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={() => errors.email && setErrors({ ...errors, email: "" })}
          />
          {errors.email && (
            <Text color="red.500" fontSize="sm">
              {errors.email}
            </Text>
          )}
        </Field.Root>
        <Field.Root>
          <Field.Label>Phone</Field.Label>
          <Input
            name="phone"
            placeholder="Enter your phone number (optional)"
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Additional Information</Field.Label>
          <Textarea
            name="message"
            placeholder="Tell us why you're interested in this course (optional)"
            rows={4}
          />
          <Field.HelperText>
            Share any relevant information about your background or interests
          </Field.HelperText>
        </Field.Root>
        <Box>
          <Button
            type="submit"
            colorScheme="blue"
            disabled={isSubmitting}
            aria-label={isSubmitting ? "Submitting..." : "Submit Application"}
            mt="4"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
};
