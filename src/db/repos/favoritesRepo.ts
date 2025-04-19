import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import prismaClient from "../prismaClient";

const HARDCODED_USER_ID = "ME";
export async function getFavorites() {
  "use cache";
  cacheTag("favorites");
  return prismaClient.favoriteCourse.findMany({
    where: { userId: HARDCODED_USER_ID },
  });
}

export async function getFavorite(courseId: string) {
  "use cache";
  cacheTag("favorite-" + courseId);
  return (
    (await prismaClient.favoriteCourse.findUnique({
      where: {
        userId_courseId: {
          userId: HARDCODED_USER_ID,
          courseId,
        },
      },
    })) != null
  );
}

export async function toggleFavorite(courseId: string) {
  // Check if the course is already favorited by the user
  const existingFavorite = await prismaClient.favoriteCourse.findUnique({
    where: {
      userId_courseId: {
        userId: HARDCODED_USER_ID,
        courseId,
      },
    },
  });

  if (existingFavorite) {
    // If it already exists, delete it (unfavorite)
    await prismaClient.favoriteCourse.delete({
      where: {
        userId_courseId: {
          userId: HARDCODED_USER_ID,
          courseId,
        },
      },
    });
  } else {
    // If it doesn't exist, create it (favorite)
    await prismaClient.favoriteCourse.create({
      data: {
        userId: HARDCODED_USER_ID,
        courseId,
      },
    });
  }

  revalidateTag("favorites-"+HARDCODED_USER_ID);
  revalidateTag("favorite-" + courseId + "-" + HARDCODED_USER_ID);
}
