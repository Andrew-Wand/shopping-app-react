import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { BsFillBagFill } from "react-icons/bs";
import { FiHeart, FiUser } from "react-icons/fi";
import MobileNavMenu from "./MobileNavMenu";
import DesktopNavMenu from "./DesktopNavMenu";

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
      document.querySelector("body").classList.add("disable-scroll");
    } else {
      setDrawerActive(false);
      document.querySelector("body").classList.remove("disable-scroll");
    }
  };

  return (
    <>
      <div className="navbar bg-base-200 shadow-md z-20 flex justify-around lg:sticky sticky top-0">
        {/* Hamburger button */}
        <div className="flex-none lg:hidden ">
          <button
            className="btn btn-square btn-ghost swap swap-rotate"
            onClick={openDrawer}
            aria-label="Opens the side bar menu to view clothing options by gender"
          >
            <input
              type="checkbox"
              aria-label="Opens the side bar menu to view clothing options by gender"
            />
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
        {/*  */}

        {/* Desktop nav buttons */}
        <DesktopNavMenu
          setGender={setGender}
          gender={gender}
          setCategory={setCategory}
          category={category}
        />

        {/*  */}
        <div>
          <Link
            to="/"
            className="btn normal-case text-[1.2rem] nav-logo rounded-xl bg-base-200 text-[#000] border-0 lg:border-0 lg:shadow-none lg:text-4xl lg:mr-[10rem] hover:bg-[#000] hover:text-[#fff] transition-[background-color] ease-in duration-300 w-full lg:w-8/12"
          >
            The Top Shop
          </Link>
        </div>
        <div className="flex-none">
          <div className="tooltip tooltip-bottom mr-1" data-tip="Cart">
            <label tabIndex={0} className="btn btn-ghost btn-circle ">
              <Link to="/cart" aria-label="Click to view your cart.">
                <BsFillBagFill className="text-3xl" />
              </Link>
            </label>
          </div>

          <div className="tooltip tooltip-bottom mr-1" data-tip="Wishlist">
            <label tabIndex={0} className="btn btn-ghost btn-circle ">
              <Link to="/wishlist" aria-label="Click to view your wishlist.">
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
        <div className="mobile-nav bg-base-300  translate-x-[0%] transition-[transform] ease-in-out duration-700 z-20 absolute w-full ">
          <MobileNavMenu
            setGender={setGender}
            gender={gender}
            setCategory={setCategory}
            category={category}
            setDrawerActive={setDrawerActive}
          />
        </div>
      ) : (
        <div className="-translate-x-[100%] "></div>
      )}
    </>
  );
}

export default Navbar;
