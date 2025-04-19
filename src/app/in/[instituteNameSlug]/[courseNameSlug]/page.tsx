import prismaClient from "@/utils/prisma/prismaClient";

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
  const where = await params;
  const course = await prismaClient.course.findFirstOrThrow({
    where,
    orderBy: {
      category: "asc",
    },
  });

  return (
    <div>
      CoursePage, courseNameSlug:
      <br /> <pre>{JSON.stringify(course, null, 2)}</pre>{" "}
    </div>
  );
};
export default CoursePage;
