import VendorPanelCharts from "../../components/charts/vendorCharts/vendorPanelCharts";
import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

export default function VendorPanel() {
  const { Root, Header, Body, Footer, Title, Description } = Card;
  return (
    <>
      <Box as="section" my={16} className="charts-section">
        <Container>
          <Heading className="vendor-heading">Overview Dashboard</Heading>
          <VendorPanelCharts />
        </Container>
      </Box>
      <Box as="section" my={16} className="products-section">
        <Container>
          <Heading className="vendor-heading">Products Listings</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <Root key={value}>
                <Header p={1}>
                  <Image
                    borderRadius="lg"
                    bgColor="#333"
                    color="#fff"
                    height="150px"
                    alt="asdas"
                    src="asd.png"
                  />
                </Header>
                <Body p={3}>
                  <Title>Product {value}</Title>
                  <Description>Description {value}</Description>
                </Body>
                <Footer display="grid" pb={3} px={3}>
                  <Button colorPalette="blue" size="sm" w="full">
                    Edit Product
                  </Button>
                  <Button colorPalette="red" size="sm" w="full">
                    Delete Product
                  </Button>
                </Footer>
              </Root>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" my={16} className="orders-section">
        <Heading className="vendor-heading">Orders Listings</Heading>
      </Box>
    </>
  );
}
