"use cache";
import prisma from "@/utils/prisma";

const CategoryPicker = async () => {
  //Get all unique prisma.course.category
  const categories = await prisma.course.findMany({
    select: {
      id: true,
      category: true,
    },
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
  });

  return <>{categories?.map(({ category }) => category)}</>;
};

export default CategoryPicker;
