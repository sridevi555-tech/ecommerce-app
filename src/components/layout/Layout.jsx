import Footer from "./Footer";
import Header from "./Header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 140px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;