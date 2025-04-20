import { z } from "zod";

// Define the application form schema using Zod
export const applicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^(\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4}$/,
      "Please enter a valid phone number"
    )
    .optional()
    .or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  courseId: z.string().min(1, "Course ID is required"),
});

// TypeScript type derived from the schema
export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Type for validation result
export type ValidationResult =
  | { success: true; data: ApplicationFormData; errors?: never }
  | { success: false; data?: never; errors: Record<string, string> };

// Helper function to validate FormData against the schema
export function validateApplicationForm(formData: FormData): ValidationResult {
  // Convert FormData to a plain object for validation
  const formValues = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || "",
    message: (formData.get("message") as string) || "",
    courseId: formData.get("courseId") as string,
  };

  // Parse the form values using the schema
  const result = applicationSchema.safeParse(formValues);

  if (!result.success) {
    // Convert Zod errors to a more usable format
    const formattedErrors: Record<string, string> = {};
    result.error.errors.forEach((error) => {
      const path = error.path[0].toString();
      formattedErrors[path] = error.message;
    });
    return { success: false, errors: formattedErrors };
  }

  return { success: true, data: result.data };
}
