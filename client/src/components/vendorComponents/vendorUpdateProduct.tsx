import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { ReactNode } from "react";
import ProductForm from "./productForm";

export default function VendorUpdateProduct({
  button,
  id,
}: {
  button: ReactNode;
  id: string;
}) {
  const {
    Root,
    Trigger,
    Backdrop,
    Positioner,
    Content,
    Header,
    Title,
    Body,
    Footer,
    ActionTrigger,
    CloseTrigger,
  } = Dialog;
  return (
    <Root>
      <Trigger asChild>{button}</Trigger>
      <Portal>
        <Backdrop />
        <Positioner>
          <Content maxW={{ base: "100%", md: "50%" }}>
            <Header>
              <Title>Update Product</Title>
            </Header>
            <Body>
              <ProductForm
                method="patch"
                isRequired={false}
                endPoint={`api/update-product/${id}`}
              />
            </Body>
            <Footer>
              <ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </ActionTrigger>
            </Footer>
            <CloseTrigger asChild>
              <CloseButton size="sm" />
            </CloseTrigger>
          </Content>
        </Positioner>
      </Portal>
    </Root>
  );
}
