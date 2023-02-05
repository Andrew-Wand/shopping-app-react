import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <div>Welcome</div>
      <Link to="/shop">Shop</Link>
    </div>
  );
}

export default Welcome;
