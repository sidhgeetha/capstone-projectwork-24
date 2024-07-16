import React, { useState, useEffect } from "react";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Button,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
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

  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productServices.getAllProducts();
        setProducts(response.data.product);
        setFilteredProducts(response.data.product);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addCart = (index) => {
    setBasket(basket + 1);
    setBasket(basket + 1);
    setStatus(status.map((s, i) => (i === index ? false : s)));
  };

  // Check if the current path is one of the child routes
  // const isChildRoute = location.pathname !== "/dashboard";

  // Determine the active tab index based on the current URL
  const getTabIndex = () => {
    switch (location.pathname) {
      case "/dashboard":
        return 0;
      case "/dashboard/addProduct":
        return 1;
      default:
        return 0;
    }
  };

  return (
    <div>
      <NavBar basket={basket} />

      <Tabs index={getTabIndex()}>
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
            {/* {!isChildRoute && ( */}
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
                            <Heading size="md">{product.product_name}</Heading>
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
                    <Button
                      onClick={() => addCart(index)}
                      colorScheme="teal"
                      borderRadius="0px"
                    >
                      Add to cart
                    </Button>
                  </Card>
                </div>
              ))}
            </SimpleGrid>
            {/* )} */}
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
