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
import Slider from "./components/Slider/Slider";
import Main from "./components/Main/Main";
import Collection from "./components/Collection/Collection";
import CollectionContextProvider from "./context/Collection";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SummerContextProvider from "./context/SummerCollection";
import NewContextProvider from "./context/Brandnew";
import Summer from "./components/Summer/Summer";

import New from "./components/New/New";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1D1D1B",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <HeaderContextProvider>
        <CollectionContextProvider>
          <SummerContextProvider>
            <NewContextProvider>
              <Router>
                <Header />
                <BasicBreadCrumbs />
                <Routes>
                  <Route path="/" element={<Main />} exact />
                  <Route path="/collection" element={<Collection />} exact />
                  <Route path="/summer" element={<Summer />} exact />
                  <Route path="/about" element={<About />} exact />
                  <Route path="/new" element={<New />} exact />
                  <Route path="/news" element={<News />} exact />
                  <Route path="/offerta" element={<Offerta />} exact />
                  <Route path="/help" element={<Help />} exact />
                  <Route path="/slider" element={<Slider />} exact />
                </Routes>
                <Footer />
              </Router>
            </NewContextProvider>
          </SummerContextProvider>
        </CollectionContextProvider>
      </HeaderContextProvider>
    </ThemeProvider>
  );
};

export default App;
