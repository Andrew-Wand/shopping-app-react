import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer p-10 bg-base-300 text-base-content">
      <span className="uppercase font-bold mb-0 lg:hidden block">Company</span>
      <div className="grid grid-cols-2 gap-5 lg:flex lg:flex-col lg:ml-[30rem]">
        <span className="uppercase font-bold mb-0 lg:block hidden">
          Company
        </span>
        <a href="/" className="link link-hover">
          About us
        </a>
        <a href="/" className="link link-hover">
          Contact
        </a>
      </div>
      <div>
        <span className="uppercase font-bold">Newsletter</span>
        <div className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="username@site.com"
              className="input input-bordered w-full pr-16"
            />
            <Link
              to="/subscribe"
              className="btn btn-primary absolute top-0 right-0 rounded-l-none"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
