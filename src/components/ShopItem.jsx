import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";

function ShopItem({
  listing,
  id,
  category,
  setCategory,
  e,
  targetId,
  handleAddToCart,
  handleAddToWishlist,
}) {
  const [inWishlist, setInWishlist] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const itemIsInWishlist = async () => {
      const docRef = doc(db, "wishlist", targetId);
      const docSnap = await getDoc(docRef);
      const userRef = docSnap.data()?.userRef;
      if (auth.currentUser.uid === userRef) {
        setInWishlist(true);
      } else {
        setInWishlist(false);
      }
    };

    itemIsInWishlist();
  }, []);

  return (
    <li className="m-10 grid-col-1 card">
      <Link to={`/shop/${e.category}/${targetId}`}>
        <img src={e.image} alt={`${e.name}`} className="w-full" />
      </Link>

      {/* <button className="btn btn-secondary" onClick={handleAddToCart}>
        Add To Cart
      </button> */}

      <button onClick={handleAddToWishlist}>
        {!inWishlist ? <FaRegHeart /> : <FaHeart />}
      </button>
    </li>
  );
}

export default ShopItem;
