import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import MyCard from "./MyCard";
import { Container, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {
    products,
    setProducts,
    data,
    setData,
    setIsLogin,
    isLogin,
    cart,
    setCart,
    setUser,
  } = useContext(DataContext);
  const [onLoading, setOnLoading] = useState(false);
  const navigate = useNavigate()

  console.log(isLogin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOnLoading(true);
        const token = localStorage.getItem("token");
        token === null ? setIsLogin(false) : setIsLogin(true);
        await fetch("https://fakestoreapi.com/products")
          .then((response) => response.json())
          .then((response) => {
            setProducts(response);
            setData(response);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setOnLoading(false);
      }
    };

    const authUser = () => {
      let myHeaders = new Headers();
      const token = localStorage.getItem("token");
      myHeaders.append("Authorization", "Bearer " + token); 
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }; 
      fetch("https://www.melivecode.com/api/auth/user", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "ok") {
            setUser(result.user);
          } else if (result.status === "forbidden") {
            localStorage.clear("token");
            setIsLogin(false);
            navigate("/");
          }
        })
        .catch((error) => console.log("error", error));
    }
    authUser()
    fetchData();
  }, []);

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
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 2, textAlign: "center" }}>
        {onLoading ? (
          <h3 style={{ color: "#3F51B5" }}>Loading...</h3>
        ) : (
          <Grid container spacing={2}>
            {data?.map((item) => (
              <MyCard
                key={item.id}
                item={item}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Home;
