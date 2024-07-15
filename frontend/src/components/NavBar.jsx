import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Button,
  Highlight,
  Text,
  Badge,
} from "@chakra-ui/react";

const NavBar = ({ basket }) => {
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
            <Box color="black" ml="20px">
              Cart
              <Badge ml="2" colorScheme="green" fontSize="1em">
                {basket}
              </Badge>
            </Box>
            <Button colorScheme="teal" variant="outline" borderRadius="0px">
              Log out
            </Button>
          </Stack>
        </Flex>
      </Box>
    </div>
  );
};

export default NavBar;
