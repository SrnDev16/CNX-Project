import {
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Box,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState,useContext } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";


const MyCard = ({ item ,handleAddToCart}) => {
  const [favState, setFavState] = useState(false);
  const { fav, setFav, setDetail} = useContext(DataContext);
  const navigate = useNavigate()

  const handleFevState = (item) => {
    setFav([...fav, item])
    setFavState(true);
    setTimeout(() => {
      setFavState(false);
    }, 1500);
  };

  const detail =  (item) => {
    setDetail(item)
    navigate("/detail")
  }

  return (
    <Grid item lg={3} sm={4} xs={6}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200, objectFit: "contain" }}
          component="img"
          image={item.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" noWrap sx={{fontFamily:"Kanit"}}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.price} $
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <IconButton
              onClick={() => {
                handleFevState(item); 
              }}
            >
              {favState ? (
                <FaHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart style={{ color: "#3F51B5" }} />
              )}
            </IconButton>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={()=> detail(item)}>detail</Button>
              <Button onClick={()=> handleAddToCart(item.id)}>add</Button>
            </ButtonGroup>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MyCard;
