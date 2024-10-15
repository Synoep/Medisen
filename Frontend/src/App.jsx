import { useState } from "react";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Info from "./Components/Info/Info";
import WhyUs from "./Components/WhyUs/WhyUs";
import Services from "./Components/Services/Services";
import Result from "./Components/Result/Result";
import Search from "./Components/Search/Search";

function App() {
  return (
    <div>
      <Navbar />
       {/* <Info /> 
       <WhyUs />  
       <Services /> */}
      <Search />

      <Footer />
    </div>
  );
}

export default App;
