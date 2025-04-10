import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Table,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Token } from "../../pages/users/Profile";
import axios from "axios";
import { mainEndPoint } from "@/assets/data/links";
import { Order } from "../user/Cart";
import { errorToaster, successToaster } from "@/assets/utils/toasters";

export default function Orders({ token, _id }: Token) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { Root, Header, Body, Footer, Cell, ColumnHeader, Row, ScrollArea } =
    Table;
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainEndPoint + "api/get-user-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      const { data } = await axios.patch(
        mainEndPoint + `api/update-order-status/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      successToaster(data.msg);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error: any) {
      console.log(error);
      errorToaster(error.response.data.msg);
    }
  };
  return (
    <Box as="section" className="user-orders" my={24}>
      <Container>
        <Heading className="main-heading">My Orders</Heading>
        {!orders.length ? (
          <Center h="200px" fontWeight={700} fontSize="2xl">
            No Orders Here
          </Center>
        ) : (
          <>
            <ScrollArea maxW="100%">
              <Root
                variant="outline"
                interactive
                borderWidth={1}
                showColumnBorder
              >
                <Header>
                  <Row>
                    <ColumnHeader>No.</ColumnHeader>
                    <ColumnHeader>Payment Method</ColumnHeader>
                    <ColumnHeader>Order Status</ColumnHeader>
                    <ColumnHeader>Address</ColumnHeader>
                    <ColumnHeader>Total Price</ColumnHeader>
                    <ColumnHeader>Actions</ColumnHeader>
                  </Row>
                </Header>
                <Body>
                  {orders.map((order, index) => (
                    <Row key={order._id}>
                      <Cell>{index + 1}</Cell>
                      <Cell>{order.payment}</Cell>
                      <Cell>{order.status}</Cell>
                      <Cell>{order.address}</Cell>
                      <Cell>{order.totalPrice}</Cell>
                      <Cell>
                        <ButtonGroup attached>
                          <Button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "cancelled")
                            }
                            colorPalette="red"
                            size="xs"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "delivered")
                            }
                            className="main-button"
                            size="xs"
                          >
                            Done
                          </Button>
                        </ButtonGroup>
                      </Cell>
                    </Row>
                  ))}
                </Body>
                <Footer>
                  <Row>
                    <Cell colSpan={5}>Total Orders</Cell>
                    <Cell>{orders.length}</Cell>
                  </Row>
                </Footer>
              </Root>
            </ScrollArea>
          </>
        )}
      </Container>
    </Box>
  );
}
