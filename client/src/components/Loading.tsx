import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="100vh">
      <Spinner w="150px" h="150px" />
    </Center>
  );
}
