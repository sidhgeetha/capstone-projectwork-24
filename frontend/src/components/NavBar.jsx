import React from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Spacer,
  Stack,
  Button,
  Highlight,
  Text,
  Badge,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";

import userServices from "../services/userServices";

export async function loader() {
  // Get the currently logged-in user
  const user = await userServices.getUser();
  // Return the user
  return { user };
}

const NavBar = ({ basket, onSearch }) => {
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

          <Spacer />

          <Stack direction="row" spacing="4" align="center">
            <Box color="black" ml="30px" display="flex" alignItems="center">
              <Icon as={FaShoppingCart} w={6} h={6} />

              <Badge ml="2" colorScheme="teal" fontSize="1em">
                {basket}
              </Badge>
            </Box>

            <Menu>
              <MenuButton colorScheme="green" rightIcon={<ChevronDownIcon />}>
                <Icon ml="12px" as={FaUser} w={6} h={6} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Box>
    </div>
  );
};

export default NavBar;
