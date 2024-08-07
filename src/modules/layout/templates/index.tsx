import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Layout: React.FC = ({ children } : any) => {
  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
