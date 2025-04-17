import Btn from "@/components/Btn";
import CategoryPicker from "@/components/CategoryPicker/CategoryPicker";
import { Button, HStack } from "@chakra-ui/react";

export default async function Home() {
  return (
    <>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
      <CategoryPicker />
      <Btn />
    </>
  );
}
