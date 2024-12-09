

// import React, { useState, useEffect } from "react";
// import { Outlet, Link as ReactRouterLink } from "react-router-dom";
// import {
//   Box,
//   Flex,
//   Spacer,
//   Stack,
//   Button,
//   Highlight,
//   Text,
//   Badge,
//   Heading,
//   Icon,
//   Tabs,
//   Tab,
//   TabList,
//   TabPanels,
//   Tab as ChakraLink,
//   TabPanel,
//   SimpleGrid,
//   Card,
//   CardBody,
//   Image,
// } from "@chakra-ui/react";
// import { FaPlus } from "react-icons/fa";
// import productServices from "../services/productServices"; // Adjust the import path as needed
// import NavBar from "../components/NavBar";

// const DashboardLayout = () => {
//   const [basket, setBasket] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [status, setStatus] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productServices.getAllProducts();
//         const productsWithQuantity = response.data.product.map((product) => ({
//           ...product,
//           quantity: 0,
//         }));
//         setProducts(productsWithQuantity);
//         setFilteredProducts(productsWithQuantity);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const addToCart = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts[index].quantity += 1;
//     setProducts(updatedProducts);
//     setBasket(basket + 1);
//   };

//   const removeFromCart = (index) => {
//     const updatedProducts = [...products];
//     if (updatedProducts[index].quantity > 0) {
//       updatedProducts[index].quantity -= 1;
//       setProducts(updatedProducts);
//       setBasket(basket - 1);
//     }
//   };

//   return (
//     <div>
//       <NavBar
//         basket={basket}
//         products={products.filter((product) => product.quantity > 0)}
//         addToCart={addToCart}
//         removeFromCart={removeFromCart}
//       />

//       <Tabs>
//         <TabList>
//           <Tab as={ReactRouterLink} to="/dashboard">
//             HOME
//           </Tab>
//           <Tab as={ReactRouterLink} to="/dashboard/addProduct">
//             ADD PRODUCT
//           </Tab>
//         </TabList>
          
      
           
       
      
//         <TabPanels>
//           <TabPanel>
//             <div>
//               <SimpleGrid
//                 spacing={4}
//                 templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
//               >
//                 {filteredProducts.map((product, index) => (
//                   <div className="col" key={product._id}>
//                     <Card maxW="sm" borderRadius="0px">
//                       <CardBody minHeight="300px">
//                         <Image src={product.product_image} borderRadius="0px" />
//                         <Stack mt="6" spacing="3">
//                           <Flex>
//                             <Box p="2">
//                               <Heading size="md">
//                                 {product.product_name}
//                               </Heading>
//                             </Box>
//                             <Spacer />
//                             <Box p="2">
//                               <Text color="teal.600" fontSize="1xl">
//                                 ${product.product_price}
//                               </Text>
//                             </Box>
//                           </Flex>
                   
//                         </Stack>
//                       </CardBody>
//                       <Button
//                         onClick={() => addToCart(index)}
//                         colorScheme="teal"
//                         borderRadius="0px"
//                       >
//                         Add to cart
//                       </Button>
//                     </Card>
//                   </div>
//                 ))}
//               </SimpleGrid>
//             </div>
//           </TabPanel>
//           <TabPanel>
//             <Outlet />
//           </TabPanel>
//           <TabPanel>
//             <Outlet />
//           </TabPanel>
//           <TabPanel>
//             <Outlet />
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </div>
//   );
// };

// export default DashboardLayout;


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
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Card,
  CardBody,
  Image,
} from "@chakra-ui/react";
import productServices from "../services/productServices";
import NavBar from "../components/NavBar";
import Pagination from "./Pagination";

const DashboardLayout = () => {
  const [basket, setBasket] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productServices.getAllProducts();
        const productsWithQuantity = response.data.product.map((product) => ({
          ...product,
          quantity: 0, // Initialize product quantity as 0
        }));
        setProducts(productsWithQuantity);
        setFilteredProducts(productsWithQuantity);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);

  // Function to add product to cart
  const addToCart = (productId) => {
    const updatedProducts = products.map((product) =>
      product._id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedProducts);

    // Recalculate the total basket count
    const newBasketCount = updatedProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    setBasket(newBasketCount);
  };

  const removeFromCart = (productId) => {
    const updatedProducts = products.map((product) =>
      product._id === productId ? { ...product, quantity: 0 } : product
    );
    setProducts(updatedProducts);

    const newBasketCount = updatedProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    setBasket(newBasketCount);
  };

  return (
    <div>
      <NavBar
        basket={basket}
        products={products.filter((product) => product.quantity > 0)}
        addToCart={addToCart}
        setBasket={setBasket}
        removeFromCart={removeFromCart}
        setProducts={setProducts}
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
                {productsToShow.map((product) => (
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
                        onClick={() => addToCart(product._id)}
                        colorScheme="teal"
                        borderRadius="0px"
                      >
                        Add to cart
                      </Button>
                      {product.quantity > 0 && (
                        <Button
                          onClick={() => removeFromCart(product._id)}
                          colorScheme="red"
                          borderRadius="0px"
                          mt={2}
                        >
                          Remove from cart
                        </Button>
                      )}
                    </Card>
                  </div>
                ))}
              </SimpleGrid>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
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

