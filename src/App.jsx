import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import WelcomeHome from "./pages/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import Wishlist from "./pages/Wishlist";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        {/* Content on page */}
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/" element={<WelcomeHome />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
