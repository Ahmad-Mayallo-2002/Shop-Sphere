import {
  Box,
  Container,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export default function FeaturedVendors() {
  return (
    <Box as="section" id="featured-vendors" my="8rem">
      <Container>
        <Heading textAlign="center" mb={8} fontWeight={700} fontSize="4xl">
          Featured Vendors
        </Heading>
        <SimpleGrid gap={4} columns={{ base: 1, md: 3 }}>
          {[1, 2, 3].map((grid) => (
            <GridItem key={grid}>
              <Image src="./product-image.jpg" mb={4} w="full" />
              <Text color="var(--textColor)" textAlign="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                nesciunt! Error illum debitis nulla itaque.
              </Text>
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
