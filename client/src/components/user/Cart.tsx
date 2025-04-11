import { mainEndPoint } from "@/assets/data/links";
import { Product } from "@/assets/data/types";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TextInputField from "../TextInputField";
import { useForm } from "react-hook-form";
import { Token } from "../../pages/users/Profile";

type CartProduct = {
  productId: Product;
  quantity: number;
};

export type Order = {
  _id: string;
  status: string;
  products: CartProduct[];
  address: string;
  payment: string;
  totalPrice: number;
  userId: {
    email: string;
    username: string;
  };
};

export default function Cart({ _id, token }: Token) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Order>();
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
        let finalPrice: number = 0;
        for (let i = 0; i < data.length; i++)
          finalPrice += +(
            data[i].productId.price -
            (data[i].productId.price * data[i].productId.discount) / 100
          ).toFixed(2);
        setTotalPrice(finalPrice);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleDeleteFromCart = async (id: string) => {
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
      setCartProducts((prev) =>
        prev.filter((product) => product.productId._id !== id)
      );
      successToaster(data.msg);
    } catch (error: any) {
      console.log(error);
      errorToaster(error.response.data.msg);
    }
  };

  const onSubmit = async (orderData: Order) => {
    try {
      orderData.totalPrice = totalPrice;
      orderData.products = cartProducts;
      const { data } = await axios.post(
        mainEndPoint + `api/create-order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      setTotalPrice(0);
      setCartProducts([]);
      successToaster(data.msg);
    } catch (error: any) {
      console.log(error);
      errorToaster(error.response.data.msg);
    }
  };
  return (
    <Box as="section" my={24} className="cart">
      <Container>
        <Heading className="main-heading">My Cart</Heading>
        {!cartProducts.length ? (
          <Center h="200px" fontWeight={700} fontSize="2xl">
            No Products in Cart
          </Center>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {cartProducts.map((product) => {
                const { productId, quantity } = product;
                return (
                  <Root key={productId._id}>
                    <Header p={3}>
                      <Image
                        src={
                          /^https/.test(productId.image)
                            ? productId.image
                            : mainEndPoint + productId.image
                        }
                        w="full"
                        h="200px"
                        alt={productId.name}
                      />
                    </Header>
                    <Body p={3} pt={0}>
                      <Title>{productId.name}</Title>
                      <Description>Price: {productId.price}</Description>
                      {productId.discount && (
                        <Description>
                          Discount: {productId.discount}
                        </Description>
                      )}
                      <Description>Quantity: {quantity}</Description>
                    </Body>
                    <Footer p={3} pt={0}>
                      <Button
                        onClick={() => handleDeleteFromCart(productId._id)}
                        w="full"
                        colorPalette="red"
                      >
                        Delete
                      </Button>
                    </Footer>
                  </Root>
                );
              })}
            </SimpleGrid>
            <Heading my={4} gridColumn="1/-1" fontSize="2xl" fontWeight={700}>
              Total Price: {totalPrice.toFixed(2)}$
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={4}>
                <TextInputField
                  label={"Address"}
                  name={"address"}
                  type={"text"}
                  register={register}
                  errors={errors}
                  placeholder={"Enter Your Address"}
                  validateObject={{ required: "Address is Required" }}
                />
                <TextInputField
                  label={"Payment Method"}
                  name={"payment"}
                  type={"text"}
                  register={register}
                  errors={errors}
                  placeholder={"Cash or Credit Card or Paypal"}
                  validateObject={{ required: "Address is Required" }}
                />
                <Button
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Loading..."
                  w="full"
                  className="main-button"
                  gridColumn="1/-1"
                >
                  Order Now
                </Button>
              </VStack>
            </form>
          </>
        )}
      </Container>
    </Box>
  );
}
