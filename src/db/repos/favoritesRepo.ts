import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import prismaClient from "../prismaClient";
import { HARDCODED_USER_ID } from "./consts";

const FAVORITES_TAG = "favorites-" + HARDCODED_USER_ID;
const getCourseFavoriteTag = (courseId: string) =>
  `favorite-${courseId}-${HARDCODED_USER_ID}`;

export async function getFavorites() {
  "use cache";
  cacheTag(FAVORITES_TAG);
  return prismaClient.favoriteCourse.findMany({
    where: { userId: HARDCODED_USER_ID },
  });
}

export async function getFavorite(courseId: string) {
  "use cache";
  cacheTag(getCourseFavoriteTag(courseId));
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

  revalidateTag(FAVORITES_TAG);
  revalidateTag(getCourseFavoriteTag(courseId));
}

export async function removeAllFavorites() {
  "use server";

  //Need to revalidate all individual favorites.
  //This does not feel too good, should probably be more interactive in the client instead but.
  //Lets go with full cache for now, to late to change.
  const currentFavorites = await prismaClient.favoriteCourse.findMany({
    where: {
      userId: HARDCODED_USER_ID,
    },
  });
  currentFavorites.forEach(({ courseId }) => {
    revalidateTag(getCourseFavoriteTag(courseId));
  });

  await prismaClient.favoriteCourse.deleteMany({
    where: {
      userId: HARDCODED_USER_ID,
    },
  });

  // Revalidate the favorites tag to refresh the cache
  revalidateTag(FAVORITES_TAG);
}
