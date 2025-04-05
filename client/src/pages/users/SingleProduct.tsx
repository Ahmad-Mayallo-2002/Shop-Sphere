import { mainEndPoint } from "@/assets/data/links";
import { Product } from "@/assets/data/types";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    image: "",
    stock: 0,
    discount: 0,
    price: 0,
    brandName: "",
    category: "",
    _id: "",
    ratings: [],
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          mainEndPoint + `api/get-products/${id}`
        );
        setProduct(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Box as="section" className="product">
        <Container my={24}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            <GridItem>
              <Image
                w="full"
                h="100%"
                src={
                  /^https/.test(product.image)
                    ? product.image
                    : mainEndPoint + product.image
                }
              />
            </GridItem>
            <GridItem>
              <Heading
                lineHeight={1.25}
                as="h2"
                fontWeight={700}
                fontSize="4xl"
              >
                {product?.name}
              </Heading>
              <Text my={6}>Category: {product?.category}</Text>
              <Text
                my={6}
                textDecor={product.discount ? "line-through" : "none"}
              >
                Old Price: {product?.price}
              </Text>
              {product.discount && (
                <>
                  <Text>
                    New Price:{" "}
                    {(
                      (1 - Number(product.discount) / 100) *
                      product.price
                    ).toFixed(2)}
                  </Text>
                  <Text my={6}>Discount: {product?.discount}</Text>
                </>
              )}
              <Text my={6}>Brand Name: {product?.brandName}</Text>
              <Text>Stock: {product?.stock}</Text>
              <Text my={6}>{product?.description}</Text>
              <ButtonGroup attached>
                <Button colorPalette="red">
                  <BiHeart />
                </Button>
                <Button className="main-button">
                  <FaCartShopping />
                </Button>
              </ButtonGroup>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
