"use client";

import { toaster } from "@/components/ui/toaster";
import { submitApplication } from "@/db/repos/submitApplication";
import { validateApplicationForm } from "@/utils/validation/applicationSchema";
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
    formData.append("courseId", courseId);

    const validationResult = validateApplicationForm(formData);
    if (!validationResult.success) {
      setErrors(validationResult.errors || {});
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitApplication(formData);

      if (result.success) {
        toaster.success({
          title: "Application submitted",
          description: result.message,
        });

        formRef.current?.reset();
      } else {
        // Handle server-side validation errors
        if (result.errors) {
          setErrors(result.errors);
        } else {
          toaster.error({
            title: "Error",
            description: result.message,
          });
        }
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

  const clearErrorOnChange = (field: string) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
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
              onChange={() => clearErrorOnChange("firstName")}
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
              onChange={() => clearErrorOnChange("lastName")}
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
            onChange={() => clearErrorOnChange("email")}
          />
          {errors.email && (
            <Text color="red.500" fontSize="sm">
              {errors.email}
            </Text>
          )}
        </Field.Root>
        <Field.Root invalid={!!errors.phone}>
          <Field.Label>Phone</Field.Label>
          <Input
            name="phone"
            placeholder="Enter your phone number (optional)"
            onChange={() => clearErrorOnChange("phone")}
          />
          {errors.phone && (
            <Text color="red.500" fontSize="sm">
              {errors.phone}
            </Text>
          )}
        </Field.Root>
        <Field.Root invalid={!!errors.message}>
          <Field.Label>Additional Information</Field.Label>
          <Textarea
            name="message"
            placeholder="Tell us why you're interested in this course (optional)"
            rows={4}
            onChange={() => clearErrorOnChange("message")}
          />
          <Field.HelperText>
            Share any relevant information about your background or interests
          </Field.HelperText>
          {errors.message && (
            <Text color="red.500" fontSize="sm">
              {errors.message}
            </Text>
          )}
        </Field.Root>
        <Box>
          <Button
            type="submit"
            colorScheme="blue"
            data-testid="submit-application-btn"
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
