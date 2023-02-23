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
import { IoShirtSharp } from "react-icons/io5";

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
      <header>
        <h1 className="text-center p-5 text-4xl lg:p-10 lg:text-6xl">
          Wishlist
        </h1>
      </header>

      <div className="divider lg:w-6/12 lg:ml-[30rem]">
        <IoShirtSharp className="text-4xl" />
      </div>

      {loading ? (
        <Loading />
      ) : wishlist && wishlist.length > 0 ? (
        <main>
          <ul className="lg:mx-56">
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
