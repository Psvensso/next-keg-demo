"use server";
import prisma from "@/db/prismaClient";
import { validateApplicationForm } from "@/utils/validation/applicationSchema";
import { revalidateTag } from "next/cache";
import { HARDCODED_USER_ID } from "./consts";

export async function submitApplication(formData: FormData) {
  // Use the shared Zod validation
  const validationResult = validateApplicationForm(formData);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.errors,
    };
  }

  const validData = validationResult.data;
  if (!validData) {
    throw new Error("Unexpected bad validation data");
  }
  try {
    const course = await prisma.course.findUnique({
      where: { id: validData.courseId },
    });

    if (!course) {
      return {
        success: false,
        message: "Course not found",
      };
    }

    // Create the application in the database
    await prisma.application.create({
      data: {
        userId: HARDCODED_USER_ID,
        courseDescription: `${course.courseName} at ${course.instituteName}`,
        userName: `${validData.firstName} ${validData.lastName}`,
        userEmail: validData.email,
        userPhone: validData.phone || "",
        applicationText: validData.message || "",
      },
    });

    revalidateTag("applications-" + HARDCODED_USER_ID);

    return {
      success: true,
      message: "Application submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      message: "Failed to submit application. Please try again.",
    };
  }
}
