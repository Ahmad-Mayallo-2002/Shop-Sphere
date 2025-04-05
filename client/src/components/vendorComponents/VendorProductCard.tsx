import { Product } from "@/assets/data/types";
import { Button, Card, Image } from "@chakra-ui/react";
import VendorUpdateProduct from "./vendorUpdateProduct";

export default function VendorProductCard({
  name,
  description,
  image,
  _id,
}: Product) {
  const { Root, Header, Body, Title, Description, Footer } = Card;
  return (
    <Root>
      <Header p={1}>
        <Image
          borderRadius="lg"
          bgColor="#333"
          color="#fff"
          height="150px"
          alt="asdas"
          src={image}
        />
      </Header>
      <Body p={3}>
        <Title>Product {name}</Title>
        <Description>Description {description}</Description>
      </Body>
      <Footer display="grid" pb={3} px={3}>
        <VendorUpdateProduct
          button={
            <Button colorPalette="blue" size="sm" w="full">
              Edit Product
            </Button>
          }
          id={_id}
        />
        <Button colorPalette="red" size="sm" w="full">
          Delete Product
        </Button>
      </Footer>
    </Root>
  );
}
