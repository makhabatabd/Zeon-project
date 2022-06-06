import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import "./Breadcrumbs.css";

function toTitleCase(str) {
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
  if (str === "collection") {
    return "Коллекции";
  }
  if (str === "summer") {
    return "Лето 2022";
  }
  if (str === "favorite") {
    return "Избранное";
  }
  if (str === "details") {
    return "Вечернее платье";
  }
  if (str === "cart") {
    return "Корзина";
  }
  if (str === "details") {
    return "Детали";
  }
}

export default function BasicBreadCrumbs() {
  let location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(location.pathname);
  return (
    <div className="container">
      {pathnames.length > 0 ? (
        <Breadcrumbs
          className="breadcrumps"
          style={{ margin: "21px 0", textDecoration: "none" }}
        >
          <Link
            style={{ textDecoration: "none", color: "#393939" }}
            className="link"
            component={RouterLink}
            to="/"
          >
            Главная
          </Link>
          {location.pathname == "/summer" ? (
            <Link
              style={{ textDecoration: "none", color: "#393939" }}
              className="link"
              component={RouterLink}
              to="/collection"
            >
              Коллекции
            </Link>
          ) : null}
          {location.pathname == "/details" ? (
            <>
              <Link
                style={{ textDecoration: "none", color: "#393939" }}
                className="link"
                component={RouterLink}
                to="/"
              >
                Коллекции
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#393939" }}
                className="link"
                component={RouterLink}
                to="/"
              >
                Лето 2022
              </Link>
            </>
          ) : null}
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return last ? (
              <Typography
                sx={{ fontSize: "14px", fontWeight: "500" }}
                className="typo"
                key={to}
              >
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
