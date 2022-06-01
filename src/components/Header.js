import React from "react";
import logoPath from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={logoPath}
        alt="Around the U.S logo"
        className="header__logo"
      />
    </header>
  );
}

export default Header;
