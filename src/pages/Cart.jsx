import { useState, useEffect } from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import Loading from "../components/Loading";

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
        console.log(cartItems);
        setLoading(false);
      } catch (error) {
        console.log("Cannot get cart items");
      }
    };
    fetchCartItems();
  }, []);

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
                <li>
                  <h1>{item.data.name}</h1>

                  <figure>
                    <img src={item.data.image} alt="Clothing" />
                  </figure>
                </li>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
}

export default Cart;
