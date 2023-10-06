import {
  Button,
  Box,
  Typography,
  IconButton,
  Container,
  Stack,
  Paper,
} from "@mui/material";
import { DataContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { FaRegWindowClose, FaPlus, FaMinus } from "react-icons/fa";
import styles from "./cart.module.css";

const CartPage = () => {
  const { cart, setCart } = useContext(DataContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calTotal();
  }, [cart]);

  const increaseQuantity = (id, index) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
    calTotal();
  };

  const decreaseQuantity = (id, index) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    if (newCart[index].quantity < 1) {
      removeItem(id);
    } else {
      setCart(newCart);
      calTotal();
    }
  };

  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));

  const calTotal = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };


  console.log(cart);

  return (
    <>
      <Container
        maxWidth="lg"
        component={Paper}
        sx={{ mt: 3, p: 2, textAlign: "center" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontFamily: "Kanit", color: "#3F51B5" }}
          >
            Cart
          </Typography>
        </Box>
        <Stack direction={"column"}>
          {cart.length === 0 && <p>Cart is empty...</p>}
          {cart?.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                borderBottom: "1px solid #ccc",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ height: "100px", objectFit: "contain" }}
              />

              <Typography variant="subtitle" noWrap sx={{ maxWidth: "250px" }}>
                {item.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => {
                    decreaseQuantity(item.id, index);
                  }}
                >
                  <FaMinus />
                </IconButton>
                <p className={styles.quantity}>{item.quantity}</p>
                <IconButton
                  onClick={() => {
                    increaseQuantity(item.id, index);
                  }}
                >
                  <FaPlus />
                </IconButton>
              </Box>
              <p>Price {item.quantity * item.price} $</p>
              <IconButton onClick={() => removeItem(item.id)}>
                <FaRegWindowClose />
              </IconButton>
            </Box>
          ))}
        </Stack>

        {total === 0 ? (
          ""
        ) : (
          <Box sx={{ mt: 2 ,display:"flex",justifyContent:"space-evenly"}}>
            <h3>Total Price : {total} $</h3>
            <Button variant="contained">Checkout</Button>
          </Box>
        )}
      </Container>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #3F51B5",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default CartPage;
