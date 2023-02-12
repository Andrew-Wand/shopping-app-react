import { doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";

function WishlistItem({ wishItem, wishlist }) {
  const onDeleteFromWishlist = async (wishlistId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "wishlist", wishlistId));

      const updatedCart = wishlist.filter((item) => item.id !== cartItemId);
      setCartItems(updatedCart);
      console.log("Success delete!");
    }
  };

  return (
    <>
      <li>
        <h1>{wishItem.name}</h1>

        <figure>
          <img src={wishItem.image} alt="Clothing" />
        </figure>

        <button type="button" onClick={() => onDeleteFromWishlist(wishItem.id)}>
          Delete
        </button>
      </li>
    </>
  );
}

export default WishlistItem;
