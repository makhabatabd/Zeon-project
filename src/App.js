import React from "react";
import Header from "./components/Header/Header";
import HeaderContextProvider from "./context/HeaderContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import BasicBreadCrumbs from "./components/Breadcrumbs/Breadcrumbs";
import News from "./components/News/News";
import Offerta from "./components/Offerta/Offerta";
import Footer from "./components/Footer/Footer";
import Help from "./components/Help/Help";
import Main from "./components/Main/Main";
import Collection from "./components/Collection/Collection";
import CollectionContextProvider from "./context/Collection";
import SummerContextProvider from "./context/SummerCollection";
import NewContextProvider from "./context/Brandnew";
import Summer from "./components/Summer/Summer";
import New from "./components/New/New";
import Favorite from "./components/Favorite/Favorite";
import FavoriteContextProvider from "./context/favoriteContext";
import Details from "./components/Details/Details";
import HitDetails from "./components/HitDetails/HitDetails";
import NewDetails from "./components/NewDetails/NewDetails";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./context/CartContext";
import Order from "./components/Order/Order";
import "react-phone-number-input/style.css";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import AllContextProvider from "./context/AllContext";
import Search from "./components/Search/Search";
import Slider from "./components/Slider/Slider";
import SearchPage from "./components/SearchPage/SearchPage";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#E5271B",
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AllContextProvider>
          <HeaderContextProvider>
            <CollectionContextProvider>
              <SummerContextProvider>
                <NewContextProvider>
                  <FavoriteContextProvider>
                    <CartContextProvider>
                      <Router>
                        <ScrollTop />
                        <Header />
                        <BasicBreadCrumbs />
                        <Routes>
                          <Route
                            path="/searchpage/:searchValue"
                            element={<SearchPage />}
                          />
                          <Route path="/search" element={<Search />} />
                          <Route path="/details/:id" element={<Details />} />
                          <Route path="/order" element={<Order />} />
                          <Route
                            path="/hitdetails/:id"
                            element={<HitDetails />}
                          />
                          <Route
                            path="/newdetails/:id"
                            element={<NewDetails />}
                          />
                          <Route path="/" element={<Main />} exact />
                          <Route
                            path="/favorite"
                            element={<Favorite />}
                            exact
                          />
                          <Route path="/cart" element={<Cart />} exact />
                          <Route
                            path="/collection"
                            element={<Collection />}
                            exact
                          />
                          <Route path="/summer" element={<Summer />} exact />
                          <Route path="/about" element={<About />} exact />
                          <Route path="/new" element={<New />} exact />
                          <Route path="/news" element={<News />} exact />
                          <Route path="/offerta" element={<Offerta />} exact />
                          <Route path="/help" element={<Help />} exact />
                        </Routes>
                        <Footer />
                      </Router>
                    </CartContextProvider>
                  </FavoriteContextProvider>
                </NewContextProvider>
              </SummerContextProvider>
            </CollectionContextProvider>
          </HeaderContextProvider>
        </AllContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
