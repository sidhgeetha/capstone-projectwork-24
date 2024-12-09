


// import React from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Flex,
//   Spacer,
//   Stack,
//   Button,
//   Highlight,
//   Text,
//   Badge,
//   Icon,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import userServices from "../services/userServices";

// export async function loader() {
//   const user = await userServices.getUser();
//   return { user };
// }

// const NavBar = ({
//   basket,
//   onSearch,
//   products = [],
//   addToCart,
//   removeFromCart,
// }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const navigate = useNavigate();
//   const { user } = useLoaderData();

//   const handleLogout = () => {
//     userServices
//       .signout()
//       .then((response) => {
//         console.log(response);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const total = products.reduce(
//     (acc, product) => acc + product.product_price * product.quantity,
//     0
//   );

//   return (
//     <div style={{ padding: "24px" }}>
//       <Box>
//         <Flex align="center">
//           <Box p="2">
//             <Text mt="6" fontWeight="bold">
//               <Highlight
//                 query="GRAM"
//                 styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
//               >
//                 SHOPGRAM
//               </Highlight>
//             </Text>
//           </Box>

//           <Spacer />

//           <Stack direction="row" spacing="4" align="center">
//             <Box
//               color="black"
//               ml="30px"
//               display="flex"
//               alignItems="center"
//               onClick={onOpen}
//             >
//               <Icon as={FaShoppingCart} w={6} h={6} />
//               <Badge ml="2" colorScheme="teal" fontSize="1em">
//                 {basket}
//               </Badge>
//             </Box>

//             <Menu>
//               <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//                 <Icon ml="12px" as={FaUser} w={6} h={6} />
//               </MenuButton>
//               <MenuList>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </MenuList>
//             </Menu>
//           </Stack>
//         </Flex>
//       </Box>

//       <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Shopping Cart</DrawerHeader>

//           <DrawerBody>
//             {products.length > 0 ? (
//               products.map((product, index) => (
//                 <Box key={product._id} mb="4">
//                   <Flex justify="space-between">
//                     <Text>{product.product_name}</Text>
//                     <Text>${product.product_price}</Text>
//                   </Flex>
//                   <Flex justify="space-between">
//                     <Button size="sm" onClick={() => removeFromCart(index)}>
//                       -
//                     </Button>
//                     <Text>{product.quantity}</Text>
//                     <Button size="sm" onClick={() => addToCart(index)}>
//                       +
//                     </Button>
//                   </Flex>
//                 </Box>
//               ))
//             ) : (
//               <Text>No items in the cart.</Text>
//             )}
//           </DrawerBody>

//           <DrawerFooter>
//             <Flex justify="space-between" width="100%">
//               <Text>Total: ${total.toFixed(2)}</Text>
//               <Button colorScheme="teal" onClick={onClose}>
//                 Checkout
//               </Button>
//             </Flex>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// };

// export default NavBar;


import React, { useState } from "react";
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
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import userServices from "../services/userServices";

// Loader function to fetch user data
export async function loader() {
  const user = await userServices.getUser();
  return { user };
}

const NavBar = ({
  basket,
  setBasket,
  products = [],
  addToCart,
  removeFromCart,
  setProducts,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useLoaderData();
  const [editedProduct, setEditedProduct] = useState(null);

  const handleQuantityChange = (productId, operation) => {
    const updatedProducts = products.map((product) =>
      product._id === productId
        ? {
            ...product,
            quantity:
              operation === "increment"
                ? product.quantity + 1
                : Math.max(product.quantity - 1, 0),
          }
        : product
    );
    setProducts(updatedProducts);

    // Update basket count
    const newBasketCount = updatedProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    setBasket(newBasketCount);
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setEditedProduct(productToEdit);
    onEditOpen();
  };

  const handleLogout = () => {
    userServices
      .signout()
      .then(() => navigate("/login"))
      .catch((error) => console.error(error));
  };

  const handleSaveChanges = () => {
    if (editedProduct) {
      const updatedProducts = products.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      );
      setProducts(updatedProducts);
      onEditClose();
    }
  };

  const total = products.reduce(
    (acc, product) => acc + product.product_price * product.quantity,
    0
  );

  return (
    <div style={{ padding: "24px" }}>
      <Box>
        <Flex align="center" justifyContent="space-between" px="4">
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

          <Box flex="1" textAlign="center">
            <Input
              width="300px "
              mr=" 200px"
              padding="16px"
              border="1px solid black"
              borderRadius="4px"
              placeholder="Search products"
              size="md"
              borderWidth=".1px"
            />
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

      {/* Cart Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>
          <DrawerBody>
            {products.length > 0 ? (
              products.map((product) => (
                <Box key={product._id} mb="4">
                  <Flex justify="space-between">
                    <Text>{product.product_name}</Text>
                    <Text>${product.product_price}</Text>
                  </Flex>
                  <Flex justify="space-between" align="center" mt="2">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() =>
                        handleQuantityChange(product._id, "increment")
                      }
                    >
                      +
                    </Button>
                    <Text>Qty: {product.quantity}</Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() =>
                        handleQuantityChange(product._id, "decrement")
                      }
                      disabled={product.quantity <= 0}
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => handleEditProduct(product._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeFromCart(product._id)}
                    >
                      Delete
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

      {/* Edit Product Drawer */}
      <Drawer isOpen={isEditOpen} placement="right" onClose={onEditClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Product</DrawerHeader>
          <DrawerBody>
            {editedProduct && (
              <Box>
                <FormControl mb="4">
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    value={editedProduct.product_name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        product_name: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={editedProduct.product_price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        product_price: parseFloat(e.target.value),
                      })
                    }
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    value={editedProduct.quantity}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        quantity: Math.max(0, parseInt(e.target.value, 10)),
                      })
                    }
                  />
                </FormControl>
              </Box>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavBar;
