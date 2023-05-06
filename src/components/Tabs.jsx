import { useState } from "react";
import { Link } from "react-router-dom";
import List from "./List";

function Tabs() {
  const [active, setActive] = useState("new");

  return (
    <div className="flex w-full bg-[#121212] justify-center mb-20 pl-8 pr-8">
      <div className="w-full mx-auto flex items-center justify-center">
        <div className="flex flex-col space-y-10 overflow-hidden w-full max-w-[1400px]">
          <div className=" flex flex-col md:flex-row mb-4 mt-4 justify-between items-center space-y-8 md:space-y-0 ">
            <div className="flex gap-4 flex-wrap items-center justify-center">
              <button
                className={
                  active === "new"
                    ? "border border-primary rounded-full p-2 px-4 uppercase font-bold text-secondary-content bg-primary duration-150 ease-in"
                    : "border border-primary rounded-full p-2 px-4 text-secondary-content uppercase duration-150 ease-in text-sm hover:bg-[#013839]"
                }
                onClick={() => setActive("new")}
              >
                NEW
              </button>
              <button
                className={
                  active === "featured"
                    ? "border border-primary rounded-full p-2 px-4 uppercase font-bold text-secondary-content bg-primary duration-150 ease-in"
                    : "border border-primary rounded-full p-2 px-4 text-secondary-content uppercase duration-150 ease-in text-sm hover:bg-[#013839]"
                }
                onClick={() => setActive("featured")}
              >
                FEATURED
              </button>
              <button
                className={
                  active === "promotion"
                    ? "border border-primary rounded-full p-2 px-4 uppercase font-bold text-secondary-content bg-primary duration-150 ease-in"
                    : "border border-primary rounded-full p-2 px-4 text-secondary-content uppercase duration-150 ease-in text-sm hover:bg-[#013839]"
                }
                onClick={() => setActive("promotion")}
              >
                PROMOTION
              </button>
              <button
                className={
                  active === "preorder"
                    ? "border border-primary rounded-full p-2 px-4 uppercase font-bold text-secondary-content bg-primary duration-150 ease-in"
                    : "border border-primary rounded-full p-2 px-4 text-secondary-content uppercase duration-150 ease-in text-sm hover:bg-[#013839]"
                }
                onClick={() => setActive("preorder")}
              >
                PRE-ORDER
              </button>
            </div>
            {active === "new" && (
              <Link to={"/products?filter=new"}>
                <button className="btn btn-primary">SEE ALL IN NEW</button>
              </Link>
            )}
            {active === "featured" && (
              <Link to={"/products?filter=featured"}>
                <button className="btn btn-primary">SEE ALL IN FEATURED</button>
              </Link>
            )}
            {active === "promotion" && (
              <Link to={"/products?filter=promotion"}>
                <button className="btn btn-primary">
                  SEE ALL IN PROMOTION
                </button>
              </Link>
            )}
            {active === "preorder" && (
              <Link to={"/products?filter=preorder"}>
                <button className="btn btn-primary">
                  SEE ALL IN PRE-ORDER
                </button>
              </Link>
            )}
          </div>
          <div className="max-w-[1400px]">
            <List type={active} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
