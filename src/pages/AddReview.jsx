import { Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { GrStar } from "react-icons/gr";

function AddReview() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="w-full mx-auto flex justify-center items-center">
        <div className="max-w-[1400px] w-full p-4 md:p-8">
          <h1 className="text-xl xl:text-3xl font-bold text-white uppercase">
            Add Review
          </h1>
          <p className="mt-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            quod error incidunt fugiat, expedita corporis soluta rerum
            architecto, quae possimus ab perferendis maiores quam odit dicta
            reiciendis, tempore cupiditate nostrum.
          </p>
          <div className="w-full h-[1px] bg-gray-700 mt-8 mb-10 md:mb-14"></div>
          <div className="flex flex-wrap gap-4 md:items-center">
            <h3 className="text-xl text-secondary-content font-semibold">
              Rating :{" "}
            </h3>
            <div className="flex flex-row">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <GrStar
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      className={
                        ratingValue <= (hover || rating)
                          ? "text-secondary text-2xl duration-150 ease-in cursor-pointer"
                          : "text-2xl duration-150 ease-in cursor-pointer"
                      }
                    />
                  </label>
                );
              })}
            </div>
            <p className="text-lg">{rating}.0 rated</p>
          </div>
          <div className="flex flex-col space-y-4 mt-10">
            <h3 className="text-lg font-semibold text-secondary-content">
              Write Your Review :
            </h3>
            <div className="w-full">
              <Textarea
                type="text"
                label="Review"
                color="cyan"
                className="text-secondary-content tracking-wide"
              />
            </div>
            <button className="btn btn-primary sm:max-w-[300px]">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddReview;
