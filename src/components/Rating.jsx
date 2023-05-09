import React, { useState } from "react";
import { GrStar } from "react-icons/gr";

function Rating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="flex flex-col space-y-2 pt-2">
      <div className="flex flex-row space-x-4">
        <div className="flex flex-row">
          {/* {[...Array(5)].map((star, index) => {
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
                      ? "text-secondary text-2xl"
                      : "text-2xl"
                  }
                />
              </label>
            );
          })} */}
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  className="hidden"
                />
                <GrStar
                  className={
                    ratingValue <= rating
                      ? "text-secondary text-2xl"
                      : "text-2xl"
                  }
                />
              </label>
            );
          })}
        </div>
        <p className="md:text-lg tracking-wide">Ramy Sobhieh</p>
      </div>
      <p className="text-secondary-content tracking-wide pb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        nobis est quasi voluptas porro ipsum error perferendis mollitia,
        accusamus esse nulla itaque beatae adipisci voluptatibus sequi, harum
        sapiente numquam dolorem.
      </p>
      <div className="divider"></div>
    </div>
  );
}

export default Rating;
