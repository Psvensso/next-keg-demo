import prisma from "@/utils/prisma";
import Link from "next/link";

const InstitutePage = async () => {
  const institutes = await prisma.course.findMany({
    select: {
      instituteName: true,
      instituteNameSlug: true,
    },
    distinct: ["instituteNameSlug"],
    orderBy: {
      category: "asc",
    },
  });
  return (
    <div>
      <ul>
        {institutes?.map((x) => (
          <li key={x.instituteNameSlug}>
            Institute:{" "}
            <Link href={`/in/${x.instituteNameSlug}`}>{x.instituteName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InstitutePage;
