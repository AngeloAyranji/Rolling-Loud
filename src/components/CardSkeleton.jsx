import React, { Fragment } from "react";

function CardSkeleton() {
  return (
    <Fragment>
      {/* card */}
      <div className="flex flex-col rounded-xl w-[150px] md:w-[190px] shadow-xl h-full lg:w-[320px] md:h-[350px] lg:h-[560px] bg-secondary-content">
        <div className="w-full rounded-t-xl aspect-square bg-[#838383] animate-pulse"></div>
        <div className="flex flex-col justify-between lg:w-[320px] w-[150px] md:w-[190px] h-[168px] p-4 lg:p-6">
          <div>
            <div className="flex flex-col space-y-2 mb-2 ">
              <div className="h-8 w-full bg-[#c0c0c0] animate-pulse rounded-full"></div>
              <div className="div w-[80px] h-5 rounded-full bg-[#c0c0c0] animate-pulse"></div>
            </div>
          </div>
          <div className="card-actions justify-start">
            <div className="div w-[50px] h-6 rounded-full bg-[#c0c0c0] animate-pulse"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardSkeleton;
