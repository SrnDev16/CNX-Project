import { Button, Container, Paper } from "@mui/material";
import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DataContext } from "../App";

const Profile = () => {
  const navigate = useNavigate();
  const { setIsLogin,user } = useContext(DataContext);

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wont to logout ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    }).then((result) => {
      if(result.isConfirmed){
        setIsLogin(false);
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <Container
      maxWidth="sm"
      component={Paper}
      sx={{ textAlign: "center", mt: 2, p: 2 }}
    >
      <FaUserAlt
        style={{
          color: "#dedeff",
          borderRadius: "50%",
          backgroundColor: "#5c5c5c",
          fontSize: "35px",
          padding: "5px",
        }}
      />
      <p>
        <strong>First name : </strong>
        {user.fname}
      </p>
      <p>
        <strong>Last name : </strong>
        {user.lname}
      </p>
      <p>
        <strong>Username : </strong>
        {user.username}
      </p>
      <p>
        <strong>Email : </strong>
        {user.email}
      </p>
      <br />
      <Button
        variant="contained"
        sx={{ color: "#FFFFFF", bgcolor: "#3F51B5" }}
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Profile;
