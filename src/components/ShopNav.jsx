import { useState } from "react";

function ShopNav() {
  const [gender, setGender] = useState("men");

  return (
    <nav>
      <div className="tabs">
        <a className="tab tab-lifted tab-active">Men</a>
        <a className="tab tab-lifted">Women</a>
      </div>

      <div className="tabs tabs-boxed">
        <a className="tab tab-active">T-Shirts</a>
        <a className="tab ">Dress Shirts</a>
        <a className="tab">Sweaters</a>
        <a className="tab">Jackets</a>
      </div>
    </nav>
  );
}

export default ShopNav;
