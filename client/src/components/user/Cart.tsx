import { mainEndPoint } from "@/assets/data/links";
import { Product } from "@/assets/data/types";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

type Token = {
  _id: string;
  token: string;
};

export default function Cart({ _id, token }: Token) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const { Root, Header, Title, Description, Body, Footer } = Card;
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainEndPoint + "api/get-user-cart", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setCartProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleMakeOrder = async () => {};
  return (
    <Box as="section" my={24} className="cart">
      <Container>
        <Heading className="vendor-heading">My Cart</Heading>
        {!cartProducts.length ? (
          <Center h="200px" fontWeight={700} fontSize="4xl">
            No Products in Cart
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {cartProducts.map((product) => (
              <Root key={product._id}>
                <Header>
                  <Image
                    src={
                      /^https/.test(product.image)
                        ? product.image
                        : mainEndPoint + product.image
                    }
                    w="full"
                    h="200px"
                    alt={product.name}
                  />
                </Header>
                <Body>
                  <Title>{product.name}</Title>
                  <Description>Price: {product.price}</Description>
                  {product.discount && (
                    <Description>Discount: {product.discount}</Description>
                  )}
                </Body>
                <Footer>
                  <Button w="full" colorPalette="red">
                    Delete
                  </Button>
                </Footer>
              </Root>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
