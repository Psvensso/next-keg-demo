type TProps = {
  params: { course: string };
};

const CoursePage = async ({ params }: TProps) => {
  const { course } = await params;
  return <div>CoursePage: {course} </div>;
};
export default CoursePage;
