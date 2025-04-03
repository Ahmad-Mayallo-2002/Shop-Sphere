import {
  Box,
  Button,
  Container,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export default function FeaturedProducts() {
  return (
    <Box id="featured-products" my="8rem" as="section">
      <Container>
        <Heading textAlign="center" mb={8} fontWeight={700} fontSize="4xl">
          Featured Products
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {[1, 2, 3, 4, 5, 6].map((product) => (
            <GridItem key={product}>
              <Image w="full" src="/product-image.jpg" />
              <Heading my={2}>Product {product}</Heading>
              <Text my={2} color="var(--textColor)">
                $120
              </Text>
              <Text color="var(--textColor)">Description</Text>
              <Button
                className="main-outline-button"
                variant="outline"
                mt={2}
                w="full"
              >
                Add To Cart
              </Button>
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
