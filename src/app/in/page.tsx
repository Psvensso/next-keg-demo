import prismaClient from "@/db/prismaClient";
import Link from "next/link";

const InstitutePage = async () => {
  const institutes = await prismaClient.course.findMany({
    select: {
      instituteName: true,
      instituteNameSlug: true,
    },
    distinct: ["instituteNameSlug"],
    orderBy: {
      instituteName: "asc",
    },
  });
  return (
    <div>
      <ul>
        {institutes?.map((x) => (
          <li key={x.instituteNameSlug}>
            <Link href={`/in/${x.instituteNameSlug}`}>{x.instituteName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InstitutePage;
