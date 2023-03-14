import { Route, BrowserRouter, Routes } from "react-router-dom";

import Ethers from "./ethers/Ethers";
import SDK from "./sdk/SDK";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SDK />} />
      <Route path="/ethers" element={<Ethers />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
