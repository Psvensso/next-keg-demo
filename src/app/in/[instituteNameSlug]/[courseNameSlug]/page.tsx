import { NewApplicationCard } from "@/components/Applications/NewApplication/NewApplicationCard";
import CourseDetailsCard from "@/components/Courses/CourseDetailsCard";
import prismaClient from "@/db/prismaClient";

type TProps = {
  params: Promise<{ courseNameSlug: string; instituteNameSlug: string }>;
};

export async function generateStaticParams() {
  const courses = await prismaClient.course.findMany({
    select: {
      courseNameSlug: true,
      instituteNameSlug: true,
    },

    orderBy: {
      category: "asc",
    },
  });

  return courses;
}

const CoursePage = async ({ params }: TProps) => {
  const paramValues = await params;
  const course = await prismaClient.course.findFirst({
    where: {
      AND: [
        { courseNameSlug: paramValues.courseNameSlug },
        { instituteNameSlug: paramValues.instituteNameSlug },
      ],
    },
    orderBy: {
      category: "asc",
    },
  });

  if (!course) {
    throw new Error("Could not find that course");
  }

  return (
    <>
      <CourseDetailsCard course={course} />
      <NewApplicationCard courseId={course.id} />
    </>
  );
};

export default CoursePage;
