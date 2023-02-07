import { Link } from "react-router-dom";

function ShopItem({
  listing,
  id,
  category,
  setCategory,
  e,
  targetId,
  handleAddToCart,
}) {
  return (
    <li className="m-10 grid-col-1 card">
      <a>
        <img src={e.image} alt={`${e.name}`} className="w-full" />
      </a>

      <button className="btn btn-secondary" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </li>
  );
}

export default ShopItem;
