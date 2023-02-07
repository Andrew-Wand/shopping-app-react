import { Link } from "react-router-dom";

function ShopItem({ listing, id, category, setCategory, e }) {
  return (
    <li>
      <a>
        <img src={e.image} alt="Clothing" />
      </a>
    </li>
  );
}

export default ShopItem;
