import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getReviewsfromSpotId, updateReview } from "../../store/reviews";

const ReviewForm = (props) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(5);

  //const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars,
    };

    await dispatch(updateReview(payload, props.spotId, props.reviewId));
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="review-text-wrapper"></form>
      <input
        type="text"
        placeholder="Review"
        required
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <label htmlFor="stars">{stars}</label>
      <input
        id="stars"
        type="range"
        value={stars}
        min="1"
        max="5"
        step="1"
        onChange={updateStars}
        className=""
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default ReviewForm;
