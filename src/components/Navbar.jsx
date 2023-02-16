import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import Loading from "./Loading";
import { BsFillBagFill } from "react-icons/bs";
import { FiHeart, FiUser } from "react-icons/fi";
import MobileNavMenu from "./MobileNavMenu";
import ShopNav from "./ShopNav";

function Navbar({ gender, setGender, category, setCategory }) {
  const navigate = useNavigate();
  const auth = getAuth();

  const onLogout = () => {
    if (auth.currentUser) {
      auth.signOut();
      navigate("/sign-in");
    }
  };

  const [cartItems, setCartItems] = useState(null);
  const [drawerActive, setDrawerActive] = useState(false);

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
  }, []);

  const openDrawer = () => {
    if (!drawerActive) {
      setDrawerActive(+true);
    } else {
      setDrawerActive(false);
    }
  };

  // Calculate total price of items in cart
  const data = cartItems;
  const calcTotalPrice = data?.reduce(
    (a, v) => (a = a + v.data.price * v.data.quantity),
    0
  );

  // Get cart quantity
  const cartQuantities = cartItems?.map((item) => item.data.quantity);
  const cartTotal = cartQuantities?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <>
      <div className="navbar bg-base-200 shadow-md ">
        <div className="flex-none xl:hidden">
          <button
            className="btn btn-square btn-ghost swap swap-rotate"
            onClick={openDrawer}
          >
            <input type="checkbox" />
            {!drawerActive ? (
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            ) : (
              <svg
                className="swap-on fill-current opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex-1 ">
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
                  {cartTotal}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{cartTotal} Items</span>
                <span className="text-info">
                  Subtotal: ${`${calcTotalPrice}`}
                </span>
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
              <Link to="/wishlist">
                <FiHeart className="text-3xl" />
              </Link>
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

      {/* Hamburger menu for mobile */}
      {drawerActive ? (
        // <div className="absolute bg-base-300 w-full h-screen transition-[width] ease-in-out duration-700 z-20 ">
        <div className="bg-base-300 h-screen translate-x-[0%] transition-[transform] ease-in-out duration-700 z-20 absolute w-full  ">
          <div>
            <MobileNavMenu
              setGender={setGender}
              gender={gender}
              setCategory={setCategory}
              category={category}
              setDrawerActive={setDrawerActive}
            />
          </div>
        </div>
      ) : (
        <div className="-translate-x-[100%] "></div>
      )}
    </>
  );
}

export default Navbar;
