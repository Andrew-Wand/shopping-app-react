import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  limit,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";
import CartItem from "../components/CartItem";
import { IoCartSharp } from "react-icons/io5";

function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

        setLoading(false);
      } catch (error) {
        console.log("Cannot get cart items");
      }
    };
    fetchCartItems();
  }, [loading]);

  // Calculate total price of items in cart
  const data = cartItems;
  const calcPrice = data?.reduce(
    (a, v) => (a = a + v.data.price * v.data.quantity),
    0
  );

  return (
    <div>
      <header>
        <div>
          <Link to="/shop" className="btn m-5">
            Back To Shop
          </Link>
        </div>
        <h1 className="text-center p-5 text-4xl lg:p-10 lg:text-6xl">
          Shopping Cart
        </h1>
      </header>
      <div className="divider lg:w-6/12 lg:ml-[25%]">
        <IoCartSharp className="text-5xl" />
      </div>

      {loading ? (
        <Loading />
      ) : cartItems && cartItems.length > 0 ? (
        <>
          <main>
            <ul className="lg:mx-[30rem]">
              {cartItems.map((item) => (
                <CartItem
                  item={item.data}
                  id={item.id}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              ))}
            </ul>

            <div className="flex flex-col text-left p-10 lg:items-center">
              <div className="lg:flex flex justify-around">
                <p className="text-lg mb-5 lg:text-xl lg:mr-48 font-bold">
                  Subtotal:
                </p>
                <p className="text-lg mb-5 lg:text-xl">${`${calcPrice}`}</p>
              </div>

              <Link to="/checkout" className="btn btn-lg lg:w-6/12">
                Checkout
              </Link>
            </div>
            <div>
              <Link to="/shop" className="btn m-5">
                Back To Shop
              </Link>
            </div>
          </main>
        </>
      ) : (
        <div className="hero min-h-screen bg-base-100">
          <div className="hero-content text-center mb-20">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">Cart Is Empty</h1>

              <Link to="/shop" className="btn btn-primary mt-5">
                Back To Shop
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
