import { Container, Paper, Avatar, Box, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch("https://www.melivecode.com/api/users/create", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: data.fname,
        lname: data.lname,
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: " ",
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          Swal.fire("Success", "สมัครสมาชิกสำเร็จ", "success").then(() =>
            navigate("/login")
          );
        }else if(result.status === "error"){
          Swal.fire("ผิดพลาด","ชื่อผู้ใช้งาน ถูกใช้ไปแล้ว","error")
        }
      })
      .catch((err) => {
        console.log(err);
        
      });
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
          สมัครสมาชิก
        </Typography>

        <div className={styles.myForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>ชื่อ :</label>
            <input
              type="text"
              placeholder="ชื่อ"
              {...register("fname", { required: "กรูณากรอกชื่อ" })}
            />
            {errors.fname && (
              <small style={{ color: "red" }}>{errors.fname.message}</small>
            )}
            <label>นามสกุล :</label>
            <input
              type="text"
              placeholder="นามสกุล"
              {...register("lname", { required: "กรุณากรอกนามสกุล" })}
            />
            {errors.lname && (
              <small style={{ color: "red" }}>{errors.lname.message}</small>
            )}

            <label>ชื่อผู้ใช้ :</label>
            <input
              type="text"
              placeholder="username"
              {...register("username", {
                required: "กรุณากรอกชื่อผู้ใช้งาน",
                minLength: { value: 3, message: "ต้องมีอย่างน้อย 3 ตัวอักษร" },
              })}
            />
            {errors.username && (
              <small style={{ color: "red" }}>{errors.username.message}</small>
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

            <label>อีเมล :</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "กรูณากรอกอีเมล",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "อีเมลไม่ถูกต้อง",
                },
              })}
            />
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email.message}</small>
            )}
            <button type="submit">สมัครสมาชิก</button>
          </form>
        </div>
        <Link to={"/login"}>เข้าสู่ระบบ ?</Link>
      </Box>
    </Container>
  );
};

export default Register;
