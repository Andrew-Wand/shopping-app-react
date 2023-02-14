import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  limit,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import Loading from "../components/Loading";
import WishlistItem from "../components/WishlistItem";

import { db } from "../firebase.config";

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistRef = collection(db, "wishlist");

        const q = query(wishlistRef);

        const querySnap = await getDocs(q);

        let wishlistItems = [];

        querySnap.forEach((doc) => {
          return wishlistItems.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setWishlist(wishlistItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, [loading]);

  return (
    <div>
      <header>Wishlist</header>

      {loading ? (
        <Loading />
      ) : wishlist && wishlist.length > 0 ? (
        <main>
          <ul>
            {wishlist.map((wishItem) => (
              <WishlistItem
                wishItem={wishItem}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            ))}
          </ul>
        </main>
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
}

export default Wishlist;
