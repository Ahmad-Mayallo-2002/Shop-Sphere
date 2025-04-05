import VendorPanelCharts from "../../components/charts/vendorCharts/vendorPanelCharts";
import { Box, Container, Heading } from "@chakra-ui/react";
import VendorProducts from "@/components/vendorComponents/vendorProducts";
import VendorOrders from "@/components/vendorComponents/vendorOrders";
import ProductForm from "@/components/vendorComponents/productForm";

export default function VendorPanel() {
  return (
    <>
      <Box as="section" my={16} className="charts-section">
        <Container>
          <Heading className="vendor-heading">Overview Dashboard</Heading>
          <VendorPanelCharts />
        </Container>
      </Box>
      <Box as="section" my={16} className="add-product-section">
        <Container>
          <Heading className="vendor-heading">Add Product</Heading>
          <ProductForm
            method="post"
            isRequired={true}
            endPoint={"api/add-product"}
          />
        </Container>
      </Box>
      <Box as="section" my={16} className="products-section">
        <Container>
          <Heading className="vendor-heading">Products Listings</Heading>
          <VendorProducts />
        </Container>
      </Box>
      <Box as="section" my={16} className="orders-section">
        <Container>
          <Heading className="vendor-heading">Orders Listings</Heading>
          <VendorOrders />
        </Container>
      </Box>
    </>
  );
}
