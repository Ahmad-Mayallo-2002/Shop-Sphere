import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Center className="hero-section" as="section" id="hero">
        <VStack gap={7} color="#fff">
          <Heading as="h2">Discover Unique Finds</Heading>
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
