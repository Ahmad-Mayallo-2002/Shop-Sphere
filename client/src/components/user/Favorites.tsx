import { mainEndPoint } from "@/assets/data/links";
import { Product } from "@/assets/data/types";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import {
  Box,
  Button,
  ButtonGroup,
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

export default function Favorites({ token, _id }: Token) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { Header, Title, Body, Description, Footer, Root } = Card;
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          mainEndPoint + `api/get-user-favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              id: _id,
            },
          }
        );
        setFavorites(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleDeleteCart = async (id: string) => {
    try {
      const { data } = await axios.delete(
        mainEndPoint + `api/delete-from-cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      setFavorites((prev) => prev.filter((favorite) => favorite._id !== id));
      successToaster(data.msg);
    } catch (error: any) {
      errorToaster(error.response.data.msg);
    }
  };
  return (
    <Box as="section" my={24} className="favorites">
      <Container>
        <Heading className="vendor-heading">My Favorites</Heading>
        {!favorites.length ? (
          <Center h="200px" fontWeight={700} fontSize="4xl">
            No Favorites Here
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {favorites.map((favorite) => (
              <Root key={favorite._id}>
                <Header>
                  <Image
                    src={
                      /^https/.test(favorite.image)
                        ? favorite.image
                        : mainEndPoint + favorite.image
                    }
                    h="200px"
                    w="full"
                  />
                </Header>
                <Body>
                  <Title>{favorite.name}</Title>
                  <Description>Price: {favorite.price}</Description>
                  {favorite.discount && (
                    <Description>Discount: {favorite.discount}</Description>
                  )}
                </Body>
                <Footer>
                  <ButtonGroup w="full" attached>
                    <Button
                      onClick={() => handleDeleteCart(favorite._id)}
                      flexGrow={1}
                      colorPalette="red"
                    >
                      Delete
                    </Button>
                    <Button flexGrow={1} colorPalette="blue">
                      Add To Cart
                    </Button>
                  </ButtonGroup>
                </Footer>
              </Root>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
