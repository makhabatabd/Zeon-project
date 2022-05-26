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

const App = () => {
  return (
    <HeaderContextProvider>
      <Router>
        <Header />
        <BasicBreadCrumbs />
        <Routes>
          <Route path="/about" element={<About />} exact />
          <Route path="/news" element={<News />} exact />
          <Route path="/offerta" element={<Offerta />} exact />
          <Route path="/help" element={<Help />} exact />
        </Routes>
        <Footer />
      </Router>
    </HeaderContextProvider>
  );
};

export default App;
