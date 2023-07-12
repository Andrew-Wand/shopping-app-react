import { useEffect } from "react";
import { Link } from "react-router-dom";

function MobileNavMenu({ gender, setGender, setCategory, setDrawerActive }) {
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
      document.querySelector("body").classList.remove("disable-scroll");
    }
    if (selection === "shirt") {
      setCategory("shirt");
      setDrawerActive(false);
      document.querySelector("body").classList.remove("disable-scroll");
    }
    if (selection === "sweater") {
      setCategory("sweater");
      setDrawerActive(false);
      document.querySelector("body").classList.remove("disable-scroll");
    }
    if (selection === "jacket") {
      setCategory("jacket");
      setDrawerActive(false);
      document.querySelector("body").classList.remove("disable-scroll");
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
