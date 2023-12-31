import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserAlt,
  FaTimes,
  FaEquals,
} from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { products, setData, isLogin, cart, fav } = useContext(DataContext);
  const [countItems, setCountItems] = useState(0);
  const [countFav, setCountFav] = useState(0);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const handleSelect = (category) => {
      setData(products.filter((item) => item.category === category));
    };

    handleSelect(text);
  }, [text]);

  useEffect(() => {
    const calculateItems = () => {
      const sum = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCountItems(sum);
    };
    calculateItems();
  }, [cart]);

  useEffect(() => {
    setCountFav(fav.length);
  }, [fav]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerCon}>
          <div className={styles.logo} onClick={() => setData(products)}>
            <Link to={"/"}>
              <h1>Logo</h1>
            </Link>
          </div>
          <ul
            className={
              open ? `${styles.menu} ${styles.active}` : `${styles.menu}`
            }
          >
            <li
              onClick={() => {
                setText("men's clothing");
                handleOpen();
              }}
            >
              <p>Men's clothing</p>
            </li>
            <li
              onClick={() => {
                setText("jewelery");
                handleOpen();
              }}
            >
              <p>Jewelry</p>
            </li>
            <li
              onClick={() => {
                setText("electronics");
                handleOpen();
              }}
            >
              <p>Electronics</p>
            </li>
            <li
              onClick={() => {
                setText("women's clothing");
                handleOpen();
              }}
            >
              <p>Women's clothing</p>
            </li>
          </ul>
        </div>
        <div className={styles.box}>
          <div className={styles.boxIcon}>
            <div
              className={styles.cartIcon}
              onClick={() => navigate("/favorite")}
            >
              <FaHeart />
              {countFav === 0 ? "" : <p>{countFav}</p>}
            </div>
            <div className={styles.cartIcon} onClick={() => navigate("/cart")}>
              <FaShoppingCart />
              {countItems === 0 ? "" : <p>{countItems}</p>}
            </div>
            {isLogin ? (
              <div
                className={styles.cartIcon}
                onClick={() => navigate("/profile")}
              >
                <FaUserAlt />
              </div>
            ) : (
              <div className={styles.login}>
                <Link to={"/login"}>Login</Link>
              </div>
            )}
          </div>
          <div onClick={handleOpen} className={styles.mobileIcon}>
            {open ? <FaTimes /> : <FaEquals />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
