import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Center
        as="section"
        id="hero"
        bgColor="rgb(0, 0, 0, .65)"
        bgBlendMode="darken"
        bgSize="cover"
        bgPos="center"
        h="500px"
        bgImage={`url("./hero.jpg")`}
      >
        <VStack gap={7} color="#fff">
          <Heading as="h2" fontSize="5xl" fontWeight={700}>
            Discover Unique Finds
          </Heading>
          <Text>Explore a curated selection of exclusive products.</Text>
          <Button className="main-button" asChild>
            <a href="/products">Explore Now</a>
          </Button>
        </VStack>
      </Center>
      {/* Featured Products */}
      <FeaturedProducts />
      {/* Featured Vendors */}
      <FeaturedVendors />
    </>
  );
}
