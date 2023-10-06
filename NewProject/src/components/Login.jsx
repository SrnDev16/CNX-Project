import { Container, Paper, Avatar, Box, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../App";

const Login = () => {
  const {setIsLogin} = useContext(DataContext)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch("https://www.melivecode.com/api/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ 
        username:data.username,
        password:data.password,
        expiresIn: "600000"
      }),
      redirect: "follow",
    }).then((response) => response.json())
    .then((result)=>{
      console.log(result);
      if(result.status === "ok"){
        setIsLogin(true)
        localStorage.setItem("token", result.accessToken)
        navigate("/") 
      }else if(result.status === "error"){
        Swal.fire("ผิดพลาด","อีเมลหรือรหัสผ่านผิด !!","error")
      }
    })
  };

  

  return (
    <Container maxWidth="sm" component={Paper} sx={{ mt: 2, p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontFamily: "Kanit" }}>
          เข้าสู่ระบบ
        </Typography>

        <div className={styles.myForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>ชื่อผู้ใช้งาน :</label>
            <input
              type="text"
              placeholder="username"
              {...register("username", {
                required: "กรูณากรอกชื่ผู้ใช้",
              })}
            />

            {errors.email && (
              <small style={{ color: "red" }}>{errors.email.message}</small>
            )}
            <label>รหัสผ่าน :</label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              {...register("password", {
                required: "กรุณากรอกรหัสผ่าน",
                minLength: {
                  value: 6,
                  message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                },
              })}
            />
            {errors.password && (
              <small style={{ color: "red" }}>{errors.password.message}</small>
            )}
            <button type="submit">เข้าสู่ระบบ</button>
          </form>
        </div>
        <Link to={"/register"}>สมัครสมาชิก ?</Link>
      </Box>
    </Container>
  );
};

export default Login;
