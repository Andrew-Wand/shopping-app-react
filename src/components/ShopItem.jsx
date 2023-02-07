import { Link } from "react-router-dom";

function ShopItem({ listing, id }) {
  return (
    <li>
      <a>
        <img src={listing.image} alt="Clothing" />
      </a>
    </li>
  );
}

export default ShopItem;
