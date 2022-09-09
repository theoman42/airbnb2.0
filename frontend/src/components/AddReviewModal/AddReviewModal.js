import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addReview } from "../../store/reviews";

const ReviewForm = (props) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(5);

  //const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars,
    };

    dispatch(addReview(payload, props.spotId));
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="review-text-wrapper">
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
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
