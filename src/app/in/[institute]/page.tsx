type TProps = {
  params: { institute: string };
};

const InstitutePage = async ({ params }: TProps) => {
  const { institute } = await params;
  return <div>InstitutePage: {institute} </div>;
};
export default InstitutePage;
