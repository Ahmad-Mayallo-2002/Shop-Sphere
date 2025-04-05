import { mainEndPoint } from "@/assets/data/links";
import { Product } from "@/assets/data/types";
import { getToken } from "@/assets/utils/getToken";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import {
  Button,
  ButtonGroup,
  Card,
  IconButton,
  Image,
  Pagination,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import VendorUpdateProduct from "./vendorUpdateProduct";

export default function VendorProducts() {
  const { token, _id, role } = getToken();
  const limit: number = 9;
  const { Root, Header, Body, Footer, Title, Description } = Card;
  const { Root: Pagin, PrevTrigger, NextTrigger, Items } = Pagination;
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          mainEndPoint + `api/get-products?limit=${limit}&skip=${skip}`,
          { headers: { role, id: _id } }
        );
        setProducts(data.products);
        setLength(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [skip]);

  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(
        mainEndPoint + `api/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      successToaster(data.msg);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error: any) {
      errorToaster(error.response.data.msg);
      console.log(error);
    }
  };
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {products.map((product) => (
          <Root key={product._id}>
            <Header p={1}>
              <Image
                borderRadius="lg"
                bgColor="#333"
                color="#fff"
                height="150px"
                alt="asdas"
                src={
                  /^https/.test(product.image)
                    ? product.image
                    : mainEndPoint + product.image
                }
              />
            </Header>
            <Body p={3}>
              <Title>Product: {product.name}</Title>
              <Description>Price {product.price}</Description>
              <Description>Stock {product.stock}</Description>
              <Description>Discount {product.discount}</Description>
              <Description>Brand Name {product.brandName}</Description>
            </Body>
            <Footer display="grid" pb={3} px={3}>
              <VendorUpdateProduct
                id={product._id}
                button={
                  <Button colorPalette="blue" size="sm" w="full">
                    Edit Product
                  </Button>
                }
              />
              <Button
                onClick={() => handleDelete(product._id)}
                colorPalette="red"
                size="sm"
                w="full"
              >
                Delete Product
              </Button>
            </Footer>
          </Root>
        ))}
      </SimpleGrid>
      <Pagin
        onPageChange={(ev) => {
          setSkip(ev.page * limit);
        }}
        mt={8}
        count={Math.floor(length / limit)}
        pageSize={1}
        defaultPage={1}
      >
        <ButtonGroup w="100%" justifyContent="center" variant="ghost" attached>
          <PrevTrigger asChild colorPalette="pink">
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </PrevTrigger>
          <Items
            render={(page) => (
              <IconButton
                colorPalette="pink"
                variant={{ base: "ghost", _selected: "outline" }}
              >
                {page.value}
              </IconButton>
            )}
          />
          <NextTrigger asChild>
            <IconButton colorPalette="pink">
              <LuChevronRight />
            </IconButton>
          </NextTrigger>
        </ButtonGroup>
      </Pagin>
    </>
  );
}
