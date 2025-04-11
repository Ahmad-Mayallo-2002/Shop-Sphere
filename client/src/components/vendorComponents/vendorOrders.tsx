import { Button, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Order } from "../user/Cart";
import axios from "axios";
import { mainEndPoint } from "@/assets/data/links";
import { getToken } from "@/assets/utils/getToken";
import { successToaster } from "@/assets/utils/toasters";

export default function VendorOrders() {
  const { token, _id } = getToken();
  const { Root, ScrollArea, Row, Body, Footer, Header, ColumnHeader, Cell } =
    Table;
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainEndPoint + `api/get-all-orders`, {
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
  const handleDeleteOrder = async (id: string) => {
    try {
      const { data } = await axios.delete(
        mainEndPoint + `api/delete-order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      successToaster(data.msg as string);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollArea maxW="100%">
      <Root borderWidth={1} showColumnBorder>
        <Header>
          <Row>
            <ColumnHeader>No.</ColumnHeader>
            <ColumnHeader>username</ColumnHeader>
            <ColumnHeader>Email</ColumnHeader>
            <ColumnHeader>Total Price</ColumnHeader>
            <ColumnHeader>Payment Method</ColumnHeader>
            <ColumnHeader>Order Status</ColumnHeader>
            <ColumnHeader>Actions</ColumnHeader>
          </Row>
        </Header>
        <Body>
          {orders.map((order, index) => (
            <Row key={order._id}>
              <Cell>{index + 1}</Cell>
              <Cell>{order.userId.email}</Cell>
              <Cell>{order.address}</Cell>
              <Cell>{order.totalPrice}</Cell>
              <Cell>{order.payment}</Cell>
              <Cell>{order.status}</Cell>
              <Cell>
                <Button
                  onClick={() => handleDeleteOrder(order._id)}
                  colorPalette="red"
                  size="xs"
                >
                  Delete Order
                </Button>
              </Cell>
            </Row>
          ))}
        </Body>
        <Footer>
          <Row>
            <Cell colSpan={6}>Total Orders</Cell>
            <Cell>{orders.length}</Cell>
          </Row>
        </Footer>
      </Root>
    </ScrollArea>
  );
}
