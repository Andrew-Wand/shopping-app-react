import CheckoutPic from "../assets/other/checkout-pic.png";

function Checkout() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Success!</h1>
          <p className="py-6">
            Thank you for purchasing from The Top Shop! Your order is now
            processing and will ship within a few days!
          </p>
          <figure>
            <img
              src={CheckoutPic}
              alt="Checkout picture"
              className="drop-shadow-lg"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
