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
import SingleItem from "./pages/SingleItem";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState("tshirt");
  const [gender, setGender] = useState("men");
  return (
    <>
      <Router>
        <Navbar
          category={category}
          setCategory={setCategory}
          gender={gender}
          setGender={setGender}
        />

        {/* Content on page */}
        <Routes>
          <Route
            path="/shop"
            element={
              <Shop
                category={category}
                setCategory={setCategory}
                gender={gender}
                setGender={setGender}
              />
            }
          />
          <Route
            path="/"
            element={
              <WelcomeHome
                category={category}
                setCategory={setCategory}
                gender={gender}
                setGender={setGender}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>

          <Route
            path="/shop/:categoryName/:listingId"
            element={<SingleItem />}
          />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
