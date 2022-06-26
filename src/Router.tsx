import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Customer from "./pages/Customer/Customer";
import Main from "./pages/Main/index";
import AddCustomer from "./pages/AddCustomer/AddCustomer";

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}
