import Btn from "@/components/Btn";
import CategoryPicker from "@/components/CategoryPicker/CategoryPicker";
import BasicTable from "@/components/TestTable";
import prisma from "@/utils/prisma";

export default async function Home() {
  const count = await prisma.course.count();
  const date = new Date().toUTCString();
  return (
    <>
      {date}
      <CategoryPicker count={count} />
      <Btn />
      <BasicTable />
    </>
  );
}
