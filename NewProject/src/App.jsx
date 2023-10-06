import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Favorite from "./components/Favorite";
import DetailPage from "./components/DetailPage";
import CartPage from "./components/CartPage";
import { useState, createContext } from "react";

export const DataContext = createContext("");

function App() {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);
  const [fav, setFav] = useState([]);
  const [detail, setDetail] = useState({});
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        data,
        setData,
        isLogin,
        setIsLogin,
        fav,
        setFav,
        detail,
        setDetail,
        cart, setCart,
        user, setUser
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </DataContext.Provider>
  );
}

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
export default WrappedApp;
