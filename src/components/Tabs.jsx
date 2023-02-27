import React, { useState } from "react";
import List from "./List";
function Tabs() {
  const [active, setActive] = useState(1);
  const toggleTab = (index) => {
    setActive(index);
  };
  return (
    <div className="flex w-full bg-[#121212] justify-center mb-20 pl-8 pr-8">
      <div className="flex flex-col space-y-10 overflow-hidden">
        <div className="max-w-[1400px] flex flex-col md:flex-row md:flex-1 mb-4 mt-4 space-between items-center justify-center space-y-8 md:space-y-0">
          <div className="tabs w-full flex items-center justify-center md:block">
            <a
              className={
                active === 1
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered"
              }
              onClick={() => toggleTab(1)}
            >
              NEW
            </a>
            <a
              className={
                active === 2
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered"
              }
              onClick={() => toggleTab(2)}
            >
              FEATURED
            </a>
            <a
              className={
                active === 3
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered"
              }
              onClick={() => toggleTab(3)}
            >
              PROMOTION
            </a>
          </div>
          {active === 1 && (
            <button className="btn btn-primary">SEE ALL IN NEW</button>
          )}
          {active === 2 && (
            <button className="btn btn-primary">SEE ALL IN FEATURED</button>
          )}
          {active === 3 && (
            <button className="btn btn-primary">SEE ALL IN PROMOTION</button>
          )}
        </div>
        <div className="max-w-[1400px]">
          <List />
        </div>
      </div>
    </div>
  );
}

export default Tabs;
