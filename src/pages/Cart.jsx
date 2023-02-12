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
import Loading from "../components/Loading";
import CartItem from "../components/CartItem";

function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <div>Cart</div>
      </header>

      {loading ? (
        <Loading />
      ) : cartItems && cartItems.length > 0 ? (
        <>
          <main>
            <ul>
              {cartItems.map((item) => (
                <CartItem item={item.data} id={item.id} cartItems={cartItems} />
              ))}
            </ul>

            <p>Total: ${`${calcPrice}`} </p>
          </main>
        </>
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
}

export default Cart;
