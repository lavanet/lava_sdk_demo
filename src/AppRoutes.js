import { Route, BrowserRouter, Routes } from "react-router-dom";

import SDK from "./sdk/SDK";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SDK />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
