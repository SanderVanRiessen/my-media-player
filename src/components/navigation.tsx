// unused imports
import { Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Login</li>
        </Link>
        {/* <Link to='/mediaPlayer'>
          <li>Mediaplayer</li>
        </Link> */}
        <Link to="/home">
          <li>Home</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
