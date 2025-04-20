import prismaClient from "@/db/prismaClient";
import { HARDCODED_USER_ID } from "@/db/repos/consts";
import { Box, Flex } from "@chakra-ui/react";
import CourseListCard from "../../Courses/CourseListCard";
import { FavoriteStar } from "../FavoriteStar/FavoriteStar";
import { NoFavoritesBlock } from "./fragments/NoFavoritesBlock";

export const FavoritesList = async () => {
  const courses = await prismaClient.course.findMany({
    where: {
      favorites: {
        some: {
          userId: HARDCODED_USER_ID,
        },
      },
    },
  });

  // If no favorites are present, display a nicer UI
  if (courses.length === 0) {
    return <NoFavoritesBlock />;
  }

  return (
    <>
      {courses?.map((c) => (
        <Flex key={c.id}>
          <Flex direction="column" m="12px" alignContent="center">
            Remove
            <FavoriteStar courseId={c.id} />
          </Flex>
          <Box flex="1">
            <CourseListCard course={c} />
          </Box>
        </Flex>
      ))}
    </>
  );
};
