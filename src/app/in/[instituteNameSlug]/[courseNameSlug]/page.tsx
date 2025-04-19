import { FavoriteStar } from "@/components/Favorites/FavoriteStar/FavoriteStar";
import prismaClient from "@/db/prismaClient";
import { Suspense } from "react";

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

  // Return an array of params objects for each product
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
    <div>
      <Suspense fallback="...">
        <FavoriteStar courseId={course?.id} />
      </Suspense>
      CoursePage, courseNameSlug:
      <br /> <pre>{JSON.stringify(course, null, 2)}</pre>{" "}
    </div>
  );
};
export default CoursePage;
