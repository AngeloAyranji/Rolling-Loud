import { Link } from "react-router-dom";
import React from "react";
import { Input, Button } from "@material-tailwind/react";

function Footer({ navigation }) {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);
  return (
    <footer className="footer px-4 md:px-10 py-12 bg-[#121212] text-base-content">
      <div>
        <span className="footer-title">Products</span>
        {navigation.slice(0, -1).map((item) => (
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
        <Link to="/footer/about" className="link link-hover">
          About us
        </Link>
        <a className="link link-hover">Contact</a>
        <Link to="/brands" className="link link-hover">
          Brands
        </Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
      <div className="flex flex-col space-y-2 max-w-[24rem] w-full">
        <p className="footer-title">Newsletter</p>
        <div className="relative flex w-full ">
          <Input
            label="Email Address"
            value={email}
            color="cyan"
            onChange={onChange}
            className="pr-20 text-secondary-content"
            containerProps={{
              className:
                "min-w-0 appearance-none focus:outline-none focus:border",
            }}
          />
          <Button
            size="sm"
            color={email ? "cyan" : "cyan"}
            disabled={!email}
            className="!absolute right-1 top-1 rounded"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
