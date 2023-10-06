import { DataContext } from "../App";
import { useContext } from "react";
import Swal from "sweetalert2";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";

const DetailPage = () => {
  const { detail, setCart, cart, products,isLogin } = useContext(DataContext);

  const handleAddToCart = (id) => {
    if(isLogin){
      const having = cart.some((item) => item.id === id);
      if(having) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add to Cart success.",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          const index = cart.findIndex((item) => item.id === id)
          const product = cart.find((item) => item.id === id);
          const newProduct = { ...product , quantity: product.quantity += 1 };
          cart.splice(index, 1, newProduct); 
        }); 
      }else{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add to Cart success.",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          const newItem = products.find((item) => item.id === id);
          newItem["quantity"] = 1;
          setCart([...cart, newItem]);
        });
      }
    }else{
      Swal.fire("warning", "Please login first.","info")
    }
  };
  return (
    <>
      <Container maxWidth="lg" component={Paper} sx={{ mt: 6 }}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6}>
            <img
              src={detail.image}
              alt={detail.title}
              style={{ objectFit: "contain", width: "100%" }}
            />
          </Grid>
          <Grid item lg={6}  md={6}>
            <Stack direction={"column"} justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontFamily: "Kanit" }}>
                {detail.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#5c5c5c", fontFamily: "Kanit" }}
              >
                {detail.description}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontFamily: "Kanit" }}>
                Category : {detail.category}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontFamily: "Kanit" }}>
                Rating : {detail.rating.rate}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontFamily: "Kanit" }}>
                Price : {detail.price} $
              </Typography>
              <br />
              <Button
                variant="contained"
                sx={{ color: "#FFFFFF", background: "#757de8" ,mb: 3}}
                onClick={() => handleAddToCart(detail.id)}
              >
                Add to cart
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DetailPage;
