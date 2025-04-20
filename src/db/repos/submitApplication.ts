"use server";
import prisma from "@/db/prismaClient";
import { revalidatePath, revalidateTag } from "next/cache";
import { HARDCODED_USER_ID } from "./consts";

export async function submitApplication(formData: FormData) {
  // Validate the input data
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const courseId = formData.get("courseId") as string;

  if (!firstName || !lastName || !email || !courseId) {
    return {
      success: false,
      message: "Please fill in all required fields",
    };
  }

  try {
    // Get the course details for the application
    const course = await prisma.course.findUnique({
      where: { id: courseId },
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
        userName: `${firstName} ${lastName}`,
        userEmail: email,
        userPhone: phone || "",
        applicationText: message || "",
      },
    });

    // Revalidate the applications page
    revalidatePath("/");
    revalidatePath(`/in`);

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
