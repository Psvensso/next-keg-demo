import prismaClient from "@/utils/prisma/prismaClient";
import { FiltersClient } from "./client/FiltersClient";

export const Filters = async () => {
  //Here we could load static data for the filter options
  const courseCount = await prismaClient.course.count();

  return <FiltersClient courseCount={courseCount}></FiltersClient>;
};
