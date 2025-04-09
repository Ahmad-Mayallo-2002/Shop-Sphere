import { mainEndPoint } from "@/assets/data/links";
import { Product } from "@/assets/data/types";
import { getToken } from "@/assets/utils/getToken";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  Container,
  Heading,
  IconButton,
  Image,
  Pagination,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Products() {
  const { token, _id } = getToken();
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const limit: number = 9;
  const { Root, Header, Title, Description, Body, Footer } = Card;
  const { PrevTrigger, NextTrigger, Items } = Pagination;
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          mainEndPoint + `api/get-products?limit=${limit}&skip=${skip}`
        );
        setProducts(data.products);
        setLength(data.length);
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, [skip]);
  const handleAddToFavorites = async (id: string) => {
    try {
      const { data } = await axios.post(
        mainEndPoint + `api/add-to-favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      successToaster(data.msg);
    } catch (error: any) {
      errorToaster(error.response.data.msg);
    }
  };
  const handleAddToCart = async (id: string) => {
    try {
      const { data } = await axios.post(
        mainEndPoint + `api/add-to-cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      successToaster(data.msg);
    } catch (error: any) {
      errorToaster(error.response.data.msg);
    }
  };
  return (
    <>
      <Center className="hero-section" as="section">
        <Heading as="h2">All Products</Heading>
      </Center>
      <Box as="section" my={24} className="products">
        <Container>
          <Heading textAlign="center" mb={8} fontWeight={700} fontSize="5xl">
            Our Products
          </Heading>
          <SimpleGrid mb={8} columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {!products.length ? (
              <Center
                fontSize="3xl"
                h="200px"
                gridColumn="1/-1"
                fontWeight={600}
              >
                No Products
              </Center>
            ) : (
              products.map((product) => (
                <Root key={product._id}>
                  <Header p={2}>
                    <Image
                      borderTopRadius={6}
                      src={
                        /^https/.test(product.image)
                          ? product.image
                          : mainEndPoint + product.image
                      }
                      alt={product.name}
                      h="200px"
                      w="full"
                    />
                  </Header>
                  <Body p={3}>
                    <Title>{product.name}</Title>
                    <Description
                      textDecor={product.discount ? "line-through" : "none"}
                    >
                      Old Price: {product.price}
                    </Description>
                    {product.discount && (
                      <Description>
                        New Price:{" "}
                        {(
                          (1 - Number(product.discount) / 100) *
                          product.price
                        ).toFixed(2)}
                      </Description>
                    )}
                    <Description>Discount: {product.discount}</Description>
                  </Body>
                  <Footer p={3}>
                    <ButtonGroup attached w="full">
                      <Button
                        onClick={() => handleAddToFavorites(product._id)}
                        flexGrow={1}
                        colorPalette="red"
                      >
                        <BiHeart />
                      </Button>
                      <Button asChild flexGrow={1} colorPalette="blue">
                        <a href={`/products/${product._id}`}>More</a>
                      </Button>
                      <Button
                        onClick={() => handleAddToCart(product._id)}
                        flexGrow={1}
                        className="main-button"
                      >
                        <FaCartShopping />
                      </Button>
                    </ButtonGroup>
                  </Footer>
                </Root>
              ))
            )}
          </SimpleGrid>
          <Pagination.Root
            count={Math.floor(length / limit)}
            onPageChange={(ev) => setSkip(ev.page * limit)}
            pageSize={1}
            defaultPage={1}
          >
            <ButtonGroup
              justifyContent="center"
              w="full"
              colorPalette="pink"
              variant="ghost"
            >
              <PrevTrigger asChild>
                <IconButton>
                  <LuChevronLeft />
                </IconButton>
              </PrevTrigger>
              <Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                    {page.value}
                  </IconButton>
                )}
              />
              <NextTrigger asChild>
                <IconButton>
                  <LuChevronRight />
                </IconButton>
              </NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Container>
      </Box>
    </>
  );
}
