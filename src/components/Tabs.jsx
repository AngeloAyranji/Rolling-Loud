import React, { useState } from "react";
import List from "./List";

function Tabs() {
  const [active, setActive] = useState("new");

  return (
    <div className="flex w-full bg-[#121212] justify-center mb-20 pl-8 pr-8">
      <div className="w-full mx-auto flex items-center justify-center">
        <div className="flex flex-col space-y-10 overflow-hidden w-full max-w-[1328px]">
          <div className=" flex flex-col md:flex-row mb-4 mt-4 justify-between items-center space-y-8 md:space-y-0 ">
            <div className="tabs flex items-center justify-center md:block">
              <a
                className={
                  active === "new"
                    ? "tab tab-bordered tab-active"
                    : "tab tab-bordered"
                }
                onClick={() => setActive("new")}
              >
                NEW
              </a>
              <a
                className={
                  active === "featured"
                    ? "tab tab-bordered tab-active"
                    : "tab tab-bordered"
                }
                onClick={() => setActive("featured")}
              >
                FEATURED
              </a>
              <a
                className={
                  active === "promotion"
                    ? "tab tab-bordered tab-active"
                    : "tab tab-bordered"
                }
                onClick={() => setActive("promotion")}
              >
                PROMOTION
              </a>
            </div>
            {active === "new" && (
              <button className="btn btn-primary">SEE ALL IN NEW</button>
            )}
            {active === "featured" && (
              <button className="btn btn-primary">SEE ALL IN FEATURED</button>
            )}
            {active === "promotion" && (
              <button className="btn btn-primary">SEE ALL IN PROMOTION</button>
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
