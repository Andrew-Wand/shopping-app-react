import { useEffect, useRef } from "react";

function ShopNav({ setCategory, gender, setGender }) {
  // Handle changing genders in the navbar

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

  // Handle changing the category in the navbar

  const categoryRef1 = useRef(null);
  const categoryRef2 = useRef(null);
  const categoryRef3 = useRef(null);
  const categoryRef4 = useRef(null);

  const handleSelectCategory = (selection) => {
    if (selection === "tshirt") {
      setCategory("tshirt");
      categoryRef1.current.classList.add("tab-active");
      categoryRef2.current.classList.remove("tab-active");
      categoryRef3.current.classList.remove("tab-active");
      categoryRef4.current.classList.remove("tab-active");
    }

    if (selection === "shirt") {
      setCategory("shirt");
      categoryRef2.current.classList.add("tab-active");
      categoryRef1.current.classList.remove("tab-active");
      categoryRef3.current.classList.remove("tab-active");
      categoryRef4.current.classList.remove("tab-active");
    }

    if (selection === "sweater") {
      setCategory("sweater");
      categoryRef3.current.classList.add("tab-active");
      categoryRef1.current.classList.remove("tab-active");
      categoryRef2.current.classList.remove("tab-active");
      categoryRef4.current.classList.remove("tab-active");
    }

    if (selection === "jacket") {
      setCategory("jacket");
      categoryRef4.current.classList.add("tab-active");
      categoryRef1.current.classList.remove("tab-active");
      categoryRef2.current.classList.remove("tab-active");
      categoryRef3.current.classList.remove("tab-active");
    }
  };

  return (
    <nav>
      <div className="tabs">
        <button
          className="men tab tab-bordered tab-lg tab-active"
          onClick={() => handleSelectGender("men")}
        >
          Men
        </button>
        <button
          className="women tab tab-bordered  tab-lg"
          onClick={() => handleSelectGender("women")}
        >
          Women
        </button>
      </div>

      <div className="tabs tabs-boxed">
        <a
          className="tab tab-active category-btn tshirt"
          onClick={() => handleSelectCategory("tshirt")}
          ref={categoryRef1}
        >
          {gender === "men" ? "T-Shirts" : "T-Shirts & Tops"}
        </a>
        <a
          className="tab category-btn"
          onClick={(e) => handleSelectCategory("shirt")}
          ref={categoryRef2}
        >
          {gender === "men" ? "Dress Shirts" : "Dresses"}
        </a>
        <a
          className="tab category-btn"
          onClick={() => handleSelectCategory("sweater")}
          ref={categoryRef3}
        >
          Sweaters
        </a>
        <a
          className="tab category-btn"
          onClick={() => handleSelectCategory("jacket")}
          ref={categoryRef4}
        >
          Jackets
        </a>
      </div>
    </nav>
  );
}

export default ShopNav;
