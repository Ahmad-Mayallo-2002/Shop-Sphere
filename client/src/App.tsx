import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, ReactNode, Suspense } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import VendorPanel from "./pages/vendor/vendorPanel";

const Home = lazy(() => import("./pages/users/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const SendOTP = lazy(() => import("./pages/auth/SendOTP"));
const WriteOTP = lazy(() => import("./pages/auth/WriteOTP"));
const UpdatePassword = lazy(() => import("./pages/auth/UpdatePassword"));
const Products = lazy(() => import("./pages/users/Products"));
const Product = lazy(() => import("./pages/users/SingleProduct"));

function LoadPage({ page }: { page: ReactNode }) {
  return <Suspense fallback={<Loading />}>{page}</Suspense>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoadPage page={<Home />} />} />
          <Route path="/login" element={<LoadPage page={<Login />} />} />
          <Route path="/sign-up" element={<LoadPage page={<SignUp />} />} />
          <Route path="/send-otp" element={<LoadPage page={<SendOTP />} />} />
          <Route path="/write-otp" element={<LoadPage page={<WriteOTP />} />} />
          <Route
            path="/update-password"
            element={<LoadPage page={<LoadPage page={<UpdatePassword />} />} />}
          />
          <Route
            path="/vendor-panel"
            element={<LoadPage page={<VendorPanel />} />}
          />
          <Route path="/products" element={<LoadPage page={<Products />} />} />
          <Route
            path="/products/:id"
            element={<LoadPage page={<Product />} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
