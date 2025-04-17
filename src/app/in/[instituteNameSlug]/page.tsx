import prisma from "@/utils/prisma";
import Link from "next/link";

type TProps = {
  params: Promise<{ instituteNameSlug: string }>;
};

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    select: {
      instituteNameSlug: true,
    },
    distinct: ["instituteNameSlug"],
    orderBy: {
      category: "asc",
    },
  });

  // Return an array of params objects for each product
  return courses;
}

const InstitutePage = async ({ params }: TProps) => {
  const { instituteNameSlug } = await params;

  const coursesByInst = await prisma.course.findMany({
    where: {
      instituteNameSlug: decodeURIComponent(instituteNameSlug),
    },
  });
  return (
    <div>
      InstitutePage: {instituteNameSlug}
      <ul>
        {coursesByInst?.map((x) => (
          <li key={x.courseNameSlug}>
            <Link href={`/in/${x.instituteNameSlug}/${x.courseNameSlug}`}>
              {x.courseName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InstitutePage;
