import { Token } from "@/pages/users/Profile";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";

type User = {
  email: string;
  username: string;
  password: string;
  phone: string;
  country: string;
};

export default function UpdateUser({ token, _id }: Token) {
  console.log(token, _id);
  return (
    <Box as="section" my={24} className="update-user">
      <Container>
        <Heading className="main-heading">Update User</Heading>
        <form>
          <VStack gap={6}></VStack>
        </form>
      </Container>
    </Box>
  );
}
