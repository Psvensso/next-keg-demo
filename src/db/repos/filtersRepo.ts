import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import prismaClient from "../prismaClient";

const HARDCODED_USER_ID = "ME";


export async function getFilters() {
  "use cache";
  cacheTag("filters-" + HARDCODED_USER_ID);
  return prismaClient.courseFilter.findMany({
    where: { userId: HARDCODED_USER_ID },
  });
}

export async function getFilterById(filterId: string) {
  "use cache";
  cacheTag("filter-" + filterId);
  return prismaClient.courseFilter.findUnique({
    where: {
      id: filterId,
    },
  });
}

export async function createFilter(name: string, filter: string) {
  "use server";
  
  const newFilter = await prismaClient.courseFilter.create({
    data: {
      userId: HARDCODED_USER_ID,
      name,
      filter,
    },
  });

  revalidateTag("filters-" + HARDCODED_USER_ID);
  return newFilter;
}

export async function deleteFilter(filterId: string) {
  const filter = await prismaClient.courseFilter.findUnique({
    where: {
      id: filterId,
    },
  });

  if (!filter || filter.userId !== HARDCODED_USER_ID) {
    throw new Error("Filter not found or you don't have permission to delete it");
  }

  await prismaClient.courseFilter.delete({
    where: {
      id: filterId,
    },
  });

  revalidateTag("filters-" + HARDCODED_USER_ID);
  revalidateTag("filter-" + filterId);
}