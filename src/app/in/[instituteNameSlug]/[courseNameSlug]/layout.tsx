import { Container } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxW="container.lg" py="8">
        {children}
      </Container>
    </Suspense>
  );
}
