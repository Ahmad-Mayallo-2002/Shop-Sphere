import { footerLinks, iconsLinks } from "@/assets/data/links";
import { IoIosMail } from "react-icons/io";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bgColor="var(--darkColor)"
      id="footer"
      py={10}
      px={6}
      pb={0}
    >
      <Container>
        {/* Subscribe */}
        <VStack gapY={8} className="subscribe">
          <Heading as="h3" fontWeight={700} color="#fff" fontSize="4xl">
            Subscribe to our newsletter
          </Heading>
          <form>
            <HStack gap={0} mb={12} maxW="450px">
              <InputGroup
                startElement={
                  <Icon fontSize={24} color="#fff">
                    <IoIosMail />
                  </Icon>
                }
              >
                <Input
                  flexGrow={1}
                  color="#fff"
                  _placeholder={{ color: "#fff" }}
                  _focus={{ borderColor: "#fff" }}
                  borderRight={0}
                  placeholder="Input Your Email"
                  roundedRight="0"
                  roundedLeft="full"
                />
              </InputGroup>
              <Button
                type="submit"
                className="main-button"
                roundedLeft="0"
                roundedRight="full"
              >
                Subscribe
              </Button>
            </HStack>
          </form>
        </VStack>
        {/* Links */}
        <HStack
          flexDir={{ base: "column", lg: "row" }}
          gapY={6}
          className="links"
          pb={4}
          borderBottom="1px solid #fff"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack className="vendor-marketplace">
            <Image src="./footer logo.png" alt="Footer Logo" />
            <Heading as="h3" color="#fff" fontWeight={700} fontSize="3xl">
              Vendor Marketplace
            </Heading>
          </HStack>
          <HStack
            gap={4}
            flexDir={{ base: "column", lg: "row" }}
            className="links"
          >
            {footerLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="main-link"
                color="#fff"
              >
                {link.name}
              </Link>
            ))}
          </HStack>
        </HStack>
        {/* End */}
        <HStack
          flexDir={{ base: "column", lg: "row" }}
          py={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="#fff">All Copyrights are Reserved &copy; 2025</Text>
          <HStack gap={4}>
            {iconsLinks.map((link) => (
              <Link
                href={link.href}
                className="main-link"
                fontSize={24}
                key={link.name}
              >
                {link.icon && <link.icon />}
              </Link>
            ))}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
