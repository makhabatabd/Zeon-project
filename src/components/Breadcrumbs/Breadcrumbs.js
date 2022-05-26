import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import "./Breadcrumbs.css";

function toTitleCase(str) {
  // return str.replace(/\b\w+/g, function (s) {
  //   return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
  // });
  if (str === "about") {
    return "О нас";
  }
  if (str === "help") {
    return "Помощь";
  }
  if (str === "news") {
    return "Новости";
  }
  if (str === "offerta") {
    return "Публичная офферта";
  }
}

export default function BasicBreadCrumbs() {
  let location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="container">
      {pathnames.length > 0 ? (
        <Breadcrumbs className="breadcrumps" style={{ margin: "21px 0" }}>
          <Link
            style={{ textDecoration: "none", color: "#393939" }}
            className="link"
            component={RouterLink}
            to="/"
          >
            Главная
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return last ? (
              <Typography className="typo" key={to}>
                {toTitleCase(value)}
              </Typography>
            ) : (
              <Link color="inherit" component={RouterLink} to="/" key={to}>
                {toTitleCase(value)}
              </Link>
            );
          })}
        </Breadcrumbs>
      ) : null}
    </div>
  );
}
