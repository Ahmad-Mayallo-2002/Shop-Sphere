import { Button, Table } from "@chakra-ui/react";

export default function VendorOrders() {
  const { Root, ScrollArea, Row, Body, Footer, Header, ColumnHeader, Cell } =
    Table;
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <Row key={value}>
              <Cell>{value}</Cell>
              <Cell>Username {value}</Cell>
              <Cell>Email {value}</Cell>
              <Cell>Total Price: {value * 10}</Cell>
              <Cell>Payment {value}</Cell>
              <Cell>Order Status {value}</Cell>
              <Cell>
                <Button colorPalette="red" size="xs">
                  Delete Order
                </Button>
              </Cell>
            </Row>
          ))}
        </Body>
        <Footer>
          <Row>
            <Cell colSpan={6}>Total Orders</Cell>
            <Cell>10</Cell>
          </Row>
        </Footer>
      </Root>
    </ScrollArea>
  );
}
