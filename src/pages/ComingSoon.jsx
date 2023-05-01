import React from "react";

function ComingSoon() {
  return (
    <div className="w-full min-h-screen min-w-screen m-auto flex justify-center items-center">
      <div className="max-w-[1400px] w-full flex flex-col space-y-20 items-center justify-center p-8">
        <h1 className="font-planet text-[50px] text-white">
          <span className="text-primary">SKY</span>SHOP
        </h1>
        <h1 className="text-4xl md:text-7xl text-secondary-content tracking-widest uppercase font-extrabold animate-pulse text-center">
          coming <span className="text-primary">soon</span>
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">
          <div>
            <p className="text-white font-bold text-2xl max-w-[300px] mb-2">
              Get Notified When We Launch
            </p>
            <div className="form-control w-[300px] md:w-[400px] lg:w-[500px]">
              <div className="relative">
                <input
                  type="text text-sm"
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
