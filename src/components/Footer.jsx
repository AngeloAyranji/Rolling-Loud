import { Link } from "react-router-dom";

function Footer({ navigation }) {
  return (
    <footer className="footer px-4 md:px-10 py-12 bg-[#121212] text-base-content">
      <div>
        <span className="footer-title">Categories</span>
        {navigation.map((item) => (
          <a
            key={item.name}
            className="link link-hover uppercase"
            href={item.href}
          >
            {item.name}
          </a>
        ))}
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link to="/footer/about" className="link link-hover">About us</Link>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
      <div>
        <span className="footer-title">Newsletter</span>
        <div className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered w-full pr-16"
            />
            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
