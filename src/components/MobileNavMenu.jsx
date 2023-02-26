import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MobileNavMenu({
  gender,
  setGender,
  setCategory,
  category,
  setDrawerActive,
}) {
  useEffect(() => {
    if (gender === "men") {
      document.querySelector(".men").classList.add("tab-active");
      document.querySelector(".women").classList.remove("tab-active");
    }

    if (gender === "women") {
      document.querySelector(".women").classList.add("tab-active");
      document.querySelector(".men").classList.remove("tab-active");
    }
  }, [gender]);

  const handleSelectGender = (selection) => {
    if (selection === "men") {
      setGender("men");
    }

    if (selection === "women") {
      setGender("women");
    }
  };

  const handleCategory = (selection) => {
    if (selection === "tshirt") {
      setCategory("tshirt");
      setDrawerActive(false);
    }
    if (selection === "shirt") {
      setCategory("shirt");
      setDrawerActive(false);
    }
    if (selection === "sweater") {
      setCategory("sweater");
      setDrawerActive(false);
    }
    if (selection === "jacket") {
      setCategory("jacket");
      setDrawerActive(false);
    }
  };

  return (
    <div>
      <header>
        <div className="tabs p-5 flex justify-around ">
          <div>
            <button
              className="men tab tab-bordered tab-lg tab-active text-2xl"
              onClick={() => handleSelectGender("men")}
            >
              Men
            </button>
          </div>

          <div>
            <button
              className="women tab tab-bordered tab-lg text-2xl"
              onClick={() => handleSelectGender("women")}
            >
              Women
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* <div className="tabs tabs-boxed">
          <a className="tab tab-active category-btn tshirt">
            {gender === "men" ? "T-Shirts" : "T-Shirts & Tops"}
          </a>
          <a className="tab category-btn">
            {gender === "men" ? "Dress Shirts" : "Dresses"}
          </a>
          <a className="tab category-btn">Sweaters</a>
          <a className="tab category-btn">Jackets</a>
        </div> */}
        <nav>
          <ul className="menu">
            <li>
              <Link
                className="text-2xl"
                to="/shop"
                onClick={() => handleCategory("tshirt")}
              >
                {gender === "men" ? "T-Shirts" : "T-Shirts & Tops"}
              </Link>
            </li>
            <li className="block">
              <Link
                to="/shop"
                onClick={() => handleCategory("shirt")}
                className="text-2xl"
              >
                {gender === "men" ? "Dress Shirts" : "Dresses"}
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => handleCategory("sweater")}
                className="text-2xl"
              >
                Sweaters
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => handleCategory("jacket")}
                className="text-2xl"
              >
                Jackets
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default MobileNavMenu;
