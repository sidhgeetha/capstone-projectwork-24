


import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Button,
  Highlight,
  Text,
  Badge,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import userServices from "../services/userServices";

export async function loader() {
  const user = await userServices.getUser();
  return { user };
}

const NavBar = ({
  basket,
  onSearch,
  products = [],
  addToCart,
  removeFromCart,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useLoaderData();

  const handleLogout = () => {
    userServices
      .signout()
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const total = products.reduce(
    (acc, product) => acc + product.product_price * product.quantity,
    0
  );

  return (
    <div style={{ padding: "24px" }}>
      <Box>
        <Flex align="center">
          <Box p="2">
            <Text mt="6" fontWeight="bold">
              <Highlight
                query="GRAM"
                styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
              >
                SHOPGRAM
              </Highlight>
            </Text>
          </Box>

          <Spacer />

          <Stack direction="row" spacing="4" align="center">
            <Box
              color="black"
              ml="30px"
              display="flex"
              alignItems="center"
              onClick={onOpen}
            >
              <Icon as={FaShoppingCart} w={6} h={6} />
              <Badge ml="2" colorScheme="teal" fontSize="1em">
                {basket}
              </Badge>
            </Box>

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Icon ml="12px" as={FaUser} w={6} h={6} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>

          <DrawerBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <Box key={product._id} mb="4">
                  <Flex justify="space-between">
                    <Text>{product.product_name}</Text>
                    <Text>${product.product_price}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Button size="sm" onClick={() => removeFromCart(index)}>
                      -
                    </Button>
                    <Text>{product.quantity}</Text>
                    <Button size="sm" onClick={() => addToCart(index)}>
                      +
                    </Button>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>No items in the cart.</Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Flex justify="space-between" width="100%">
              <Text>Total: ${total.toFixed(2)}</Text>
              <Button colorScheme="teal" onClick={onClose}>
                Checkout
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavBar;
