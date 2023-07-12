import { Link } from "react-router-dom";

function DesktopNavMenu({ setGender, setCategory }) {
  const handleMensCategory = (selection) => {
    if (selection === "tshirt") {
      setGender("men");
      setCategory("tshirt");
    }
    if (selection === "shirt") {
      setGender("men");
      setCategory("shirt");
    }
    if (selection === "sweater") {
      setGender("men");
      setCategory("sweater");
    }
    if (selection === "jacket") {
      setGender("men");
      setCategory("jacket");
    }
  };

  const handleWomensCategory = (selection) => {
    if (selection === "tshirt") {
      setGender("women");
      setCategory("tshirt");
    }
    if (selection === "shirt") {
      setGender("women");
      setCategory("shirt");
    }
    if (selection === "sweater") {
      setGender("women");
      setCategory("sweater");
    }
    if (selection === "jacket") {
      setGender("women");
      setCategory("jacket");
    }
  };
  return (
    <div className="hidden lg:block">
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn btn-ghost mr-8 w-[7rem]">
          Men
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="/shop" onClick={() => handleMensCategory("tshirt")}>
              T-Shirts
            </Link>
          </li>
          <li className="block">
            <Link to="/shop" onClick={() => handleMensCategory("shirt")}>
              Dress Shirts
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => handleMensCategory("sweater")}>
              Sweaters
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => handleMensCategory("jacket")}>
              Jackets
            </Link>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn w-[7rem] btn-ghost">
          Women
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="/shop" onClick={() => handleWomensCategory("tshirt")}>
              T-Shirts & Tops
            </Link>
          </li>
          <li className="block">
            <Link to="/shop" onClick={() => handleWomensCategory("shirt")}>
              Dresses
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => handleWomensCategory("sweater")}>
              Sweaters
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => handleWomensCategory("jacket")}>
              Jackets
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DesktopNavMenu;
