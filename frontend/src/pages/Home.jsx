import React from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import Yc from "./Yc";
import Ys from "./Ys";
import Yf from "./Yf";
import { VStack } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";
import Home1 from "./Home1";
import Footer from "./Footer";
function Home() {
{  
  return (
    <>
    <VStack gap={15} position='relative' >
<Home1/>
<Ys/>
<Yc/>
<Yf/>

</VStack>
    </>
  )
}
}

export default Home
