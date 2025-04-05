import { headerLinks } from "@/assets/data/links";
import { getToken } from "@/assets/utils/getToken";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { UseLoggedContext } from "./contextApi/loggedContext";
import Cookies from "universal-cookie";
import logo from "../assets/images/logo.png";

export default function Header() {
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { logged, setLogged } = useContext(UseLoggedContext);
  const cookies = new Cookies();
  const { token, role } = getToken();
  return (
    <Box as="header" id="header" py={2}>
      <Container
        display="flex"
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack>
          <Image src={logo} alt="Logo Image" />
          <Heading as="h1" fontSize="2xl">
            ShopSphere
          </Heading>
        </HStack>
        <Button
          onClick={() => setOpen(!open)}
          display={{ base: "block", md: "none" }}
          className="main-button"
        >
          <FaBars />
        </Button>
        <HStack
          className="header-links-list"
          ref={listRef}
          overflowY="hidden"
          w={{ base: "100%", md: "fit" }}
          h={{ base: open ? "100%" : "0px", md: "fit" }}
          gap={4}
          as="ul"
          flexDir={{ base: "column", md: "row" }}
        >
          {headerLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
          {token || logged ? (
            <>
              {role === "user" && (
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
              )}
              {role === "vendor" && (
                <li>
                  <Link href="/vendor-panel">Vendor Panel</Link>
                </li>
              )}
              {role === "admin" && (
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              )}
              <li>
                <Link
                  href="/"
                  onClick={() => {
                    cookies.remove("token");
                    setLogged(false);
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              {" "}
              <Button asChild className="main-button">
                <a href="/login">Login</a>
              </Button>
              <Button
                variant="outline"
                borderColor="var(--mainColor)"
                _hover={{ borderColor: "var(--mainColorHover)" }}
                color="var(--mainColor)"
                asChild
              >
                <a href="/sign-up">Sign Up</a>
              </Button>
            </>
          )}
        </HStack>
      </Container>
    </Box>
  );
}
