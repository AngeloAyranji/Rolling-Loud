import { Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { GrStar } from "react-icons/gr";
import { useJwt } from "react-jwt";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function AddReview() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("product");
  const productName = queryParams.get("name");

  const { decodedToken } = useJwt(localStorage.getItem("jwt"));

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);

  const addReview = async () => {
    const reviewText = document.getElementById("reviewText").value;

    if (reviewText !== "") {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        };

        const payload = {
          data: {
            description: reviewText,
            rating: rating,
            user: {
              connect: [decodedToken?.id],
            },
            product: productId,
          },
        };

        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "api/reviews",
          payload,
          config
        );

        if (res) {
          navigate(-1);
        }
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Review</title>
      </Helmet>
      <div className="w-full mx-auto flex justify-center items-center">
        <div className="max-w-[1400px] w-full p-4 md:p-8">
          <h1 className="text-xl xl:text-3xl font-bold text-white uppercase">
            Add Review
          </h1>
          <p className="mt-8">
            {productName}
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
                id="reviewText"
                type="text"
                label="Review"
                color="cyan"
                className="text-secondary-content tracking-wide"
              />
            </div>
            <button
              onClick={addReview}
              className="btn btn-primary sm:max-w-[300px]"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddReview;
