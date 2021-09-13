import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <h1>
        <Link to="/">Encrypt Password</Link>
      </h1>
      <h2>
        <Link to="howto">How to use this app</Link>
      </h2>
    </header>
  );
};

export default Header;
