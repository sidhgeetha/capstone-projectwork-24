

import React, { useState, useEffect } from "react";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
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
  Tabs,
  Tab,
  TabList,
  TabPanels,
  Tab as ChakraLink,
  TabPanel,
  SimpleGrid,
  Card,
  CardBody,
  Image,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import productServices from "../services/productServices"; // Adjust the import path as needed
import NavBar from "../components/NavBar";

const DashboardLayout = () => {
  const [basket, setBasket] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productServices.getAllProducts();
        const productsWithQuantity = response.data.product.map((product) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(productsWithQuantity);
        setFilteredProducts(productsWithQuantity);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
    setBasket(basket + 1);
  };

  const removeFromCart = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
      setBasket(basket - 1);
    }
  };

  return (
    <div>
      <NavBar
        basket={basket}
        products={products.filter((product) => product.quantity > 0)}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />

      <Tabs>
        <TabList>
          <Tab as={ReactRouterLink} to="/dashboard">
            HOME
          </Tab>
          <Tab as={ReactRouterLink} to="/dashboard/addProduct">
            ADD PRODUCT
          </Tab>
        </TabList>
          
      
           
       
      
        <TabPanels>
          <TabPanel>
            <div>
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              >
                {filteredProducts.map((product, index) => (
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
                   
                        </Stack>
                      </CardBody>
                      <Button
                        onClick={() => addToCart(index)}
                        colorScheme="teal"
                        borderRadius="0px"
                      >
                        Add to cart
                      </Button>
                    </Card>
                  </div>
                ))}
              </SimpleGrid>
            </div>
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
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
