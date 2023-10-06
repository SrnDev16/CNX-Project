import { useContext } from "react";
import { DataContext } from "../App";
import Swal from "sweetalert2";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  IconButton,
  Button,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FaTrashAlt } from "react-icons/fa";

const Favorite = () => {
  const { fav, setFav,cart,setCart ,products } = useContext(DataContext);
 

  const handleAddToCart = (id) => {
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
  };

  const deleteFav = (id) => {
    setFav(fav.filter((item) => item.id !== id));
  };

  console.log(fav);
  return (
   <>
      <Container
        maxWidth="lg"
        component={Paper}
        sx={{ mt: 3, p: 3, textAlign: "center"}}
      >
        <Typography variant="h5" sx={{ color: "#3F51B5"  ,fontFamily:"Kanit"}}>
          Your favorite
        </Typography>
        <br />
        {fav.length === 0 ? (
          <p>Empty....</p>
        ) : (
          <Grid container spacing={2}>
            {fav?.map((item) => (
              <FavCard key={item.id} item={item} deleteFav={deleteFav} handleAddToCart={handleAddToCart}/>
            ))}
          </Grid>
        )}
      </Container>
   </>
  );
};

const FavCard = ({ item, deleteFav ,handleAddToCart}) => {


 
  return (
    <Grid item lg={3} >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200, objectFit: "contain" }}
          component="img"
          image={item.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.price} $
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() => {
              deleteFav(item.id);
            }}
          >
            <FaTrashAlt style={{ color: "#003f8f" }} />
          </IconButton>
          <Button variant="outlined" onClick={()=> handleAddToCart(item.id)}>add to cart</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Favorite;
