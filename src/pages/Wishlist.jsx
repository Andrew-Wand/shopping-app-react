import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import Loading from "../components/Loading";
import WishlistItem from "../components/WishlistItem";
import { IoHeartSharp } from "react-icons/io5";

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

      <div className="divider lg:w-6/12 lg:ml-[25%]">
        <IoHeartSharp className="text-5xl" />
      </div>

      {loading ? (
        <Loading />
      ) : wishlist && wishlist.length > 0 ? (
        <main>
          <div>
            <Link to="/shop" className="btn m-5">
              Back To Shop
            </Link>
          </div>
          <ul className="lg:mx-[30rem]">
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
        <div className="hero min-h-screen bg-base-100">
          <div className="hero-content text-center mb-20">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">Wishlist Is Empty</h1>

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

export default Wishlist;
