import prisma from "@/utils/prisma";
import { FiltersClient } from "./client/FiltersClient";

export const Filters = async () => {
  //Here we could load static data for the filter options
  const courseCount = await prisma.course.count();

  return <FiltersClient courseCount={courseCount}></FiltersClient>;
};
