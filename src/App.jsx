import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import NewProduct from "./pages/NewProduct";
import ProductDetails from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="grid h-[100vh] w-[95vw] grid-cols-[auto_1fr]">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/add-new-product" element={<NewProduct />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
