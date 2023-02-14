import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function CartItem({ item, id, cartItems, setCartItems }) {
  const [quantity, setQuantity] = useState(
    item.quantity === 0 ? 1 : item.quantity
  );

  const onDeleteFromCart = async (cartItemId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "cartItems", cartItemId));

      const updatedCart = cartItems.filter((item) => item.id !== cartItemId);
      setCartItems(updatedCart);
      console.log("Success delete!");
    }
  };

  const addQuantity = async () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity + 1,
    });
  };

  const minusQuantity = async () => {
    setQuantity((previousQuantity) => previousQuantity - 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity - 1,
    });
  };
  return (
    <>
      <li>
        <h1>{item.name}</h1>

        <figure>
          <img src={item.image} alt="Clothing" />
        </figure>

        <p>Price : ${item.price}</p>
        <div className="flex mt-2 ml-1">
          {/* Adjust Quantity */}
          <div className="text-lg font-bold text-neutral border border-primary flex justify-around w-24">
            <div
              className="border-r border-primary text-sm px-1 pr-3 w-6 flex justify-center items-center cursor-pointer"
              onClick={minusQuantity}
            >
              <AiOutlineMinus />
            </div>
            <p>{quantity}</p>
            <div
              className="border-l border-primary text-sm px-1 pl-2 w-6 flex justify-center items-center cursor-pointer"
              onClick={addQuantity}
            >
              <AiOutlinePlus />
            </div>
          </div>
        </div>

        <button type="button" onClick={() => onDeleteFromCart(id)}>
          Delete
        </button>
      </li>
    </>
  );
}

export default CartItem;
