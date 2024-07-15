import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Image,
  Text,
  SimpleGrid,
  Spacer,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab as ChakraLink,
  TabPanel,
} from "@chakra-ui/react";
// import AddProduct from "./AddProduct";

import productServices from "../services/productServices"; // Adjust the import path as needed
import NavBar from "../components/NavBar";

const DashboardLayout = () => {
  const [basket, setBasket] = useState(0);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productServices.getAllProducts();
        setProducts(response.data.product);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addCart = (index) => {
    setCartCount(cartCount + 1);
    setBasket(basket + 1); // Update basket count
    setStatus(status.map((s, i) => (i === index ? false : s)));
  };

  return (
    <div>
      <NavBar basket={basket} />
      <Spacer />
      <Tabs>
        <TabList>
          <ChakraLink as={ReactRouterLink} to="/dashboard">
            Home
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/dashboard/addProduct">
            Add Product
          </ChakraLink>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              >
                {products.map((product, index) => (
                  <div className="col" key={product._id}>
                    <Card maxW="sm" borderRadius="0px">
                      <CardBody minHeight="300px">
                        <Image src={product.product_image} borderRadius="0px" />
                        <Stack mt="6" spacing="3">
                          <Flex>
                            <Box p="2">
                              <Heading size="md">
                                {product.product_name}
                              </Heading>
                            </Box>
                            <Spacer />
                            <Box p="2">
                              <Text color="teal.600" fontSize="1xl">
                                ${product.product_price}
                              </Text>
                            </Box>
                          </Flex>
                          <Text>{product.product_description}</Text>
                        </Stack>
                      </CardBody>
                      {/* <CardFooter>
                        <ButtonGroup spacing="0"> */}
                      <Button onClick={() => addCart(index)} colorScheme="teal">
                        Add to cart
                      </Button>
                      {/* </ButtonGroup>
                      </CardFooter> */}
                    </Card>
                  </div>
                ))}
              </SimpleGrid>
            </div>
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default DashboardLayout;
