import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReviewTitleComponent = (props) => {
  const dispatch = useDispatch();
  const reviews = Object.values(useSelector((state) => state.reviews));

  const avgCalc = (reviews) => {
    let count = reviews.length;
    let sum = 0;
    reviews.forEach((review) => {
      sum = sum + review.stars;
    });
    return sum ? sum / count : 0;
  };

  useEffect(() => {});

  return (
    <>
      <div className="avgStars-wrapper">
        {reviews ? `${avgCalc(reviews)} Stars` : `Leave the First Review!`}
      </div>
      <div className="stars-count-wrapper">{`${
        reviews ? reviews.length : 0
      } Reviews`}</div>
    </>
  );
};

export default ReviewTitleComponent;
