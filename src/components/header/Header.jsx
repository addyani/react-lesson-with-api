import React from "react";
import Logo from "../../assets/react.svg";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <img className="header__logo" src={Logo} alt="" />
      <h1>Shopping</h1>
    </header>
  );
};

export default Header;
