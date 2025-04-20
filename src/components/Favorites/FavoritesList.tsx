import { Course } from "@/db/generated";
import { Box, Flex } from "@chakra-ui/react";
import CourseCard from "../CourseCard";
import { FavoriteStar } from "./FavoriteStar/FavoriteStar";

type TProps = {
  courses: Course[];
};

export const FavoritesList = (p: TProps) => {
  const { courses } = p;
  return (
    <>
      {courses?.map((c) => (
        <Flex key={c.id}>
          <Flex direction="column" m="12px" alignContent="center">
            Remove
            <FavoriteStar courseId={c.id} />
          </Flex>
          <Box flex="1">
            <CourseCard course={c} />
          </Box>
        </Flex>
      ))}
    </>
  );
};
