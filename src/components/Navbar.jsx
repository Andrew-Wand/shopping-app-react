import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import Loading from "./Loading";
import { HiOutlineHeart } from "react-icons/hi";
import { BsFillBagFill } from "react-icons/bs";
import { FiHeart, FiUser } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const onLogout = () => {
    if (auth.currentUser) {
      auth.signOut();
      navigate("/sign-in");
    }
  };

  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsRef = collection(db, "cartItems");

        const q = query(cartItemsRef);

        const cartSnapshot = await getDocs(q);

        let cartItems = [];

        cartSnapshot.forEach((doc) => {
          return cartItems.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setCartItems(cartItems);
      } catch (error) {
        console.log("Cannot get cart items");
      }
    };
    fetchCartItems();
  }, [cartItems]);

  // Calculate total price of items in cart
  const data = cartItems;
  const calcPrice = data?.reduce((a, v) => (a = a + v.data.price), 0);

  return (
    <div className="navbar bg-base-200 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Clothing Store
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mr-1">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <div className="indicator">
              <BsFillBagFill className="text-3xl" />
              <span className="badge badge-sm indicator-item">
                {cartItems?.length}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">
                {cartItems?.length} Items
              </span>
              <span className="text-info">Subtotal: ${`${calcPrice}`}</span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown-end mr-1">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <FiHeart className="text-3xl" />
          </label>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <FiUser className="text-3xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {auth.currentUser ? (
              <li>
                <Link to="/profile">Profile</Link>
                <a to="/sign-in" onClick={onLogout}>
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link to="/sign-in">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
