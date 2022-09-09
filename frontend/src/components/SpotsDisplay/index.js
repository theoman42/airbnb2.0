import "./SpotsDisplay.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteOwnerSpot, getOneSpot, getSpots } from "../../store/spots";
import { getReviewsfromSpotId, deleteOneReview } from "../../store/reviews";
import EditSpotModal from "../EditSpotModal";
import EditReviewModal from "../EditReviewModal";
import AddReviewModal from "../AddReviewModal";

const SpotsDisplay = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [noReviews, setNoReviews] = useState(true);

  const spot = useSelector((state) => state.spots.currentSpot);
  const user = useSelector((state) => state.session.user);
  const reviews = Object.values(useSelector((state) => state.reviews));

  const handleDeleteSpot = () => {
    dispatch(deleteOwnerSpot(id));
    dispatch(getSpots());
    history.push("/");
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteOneReview(reviewId));
  };

  useEffect(() => {
    dispatch(getOneSpot(id)).then(() => setIsLoaded(true));
    setNoReviews(true);
    dispatch(getReviewsfromSpotId(id)).catch(async (res) => {
      if (res.status === 500) {
        setNoReviews(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (spot && user) {
      if (spot.ownerId === user.id) {
        setIsOwned(true);
      } else {
        setIsOwned(false);
      }
    }
  }, [id, spot, user]);

  return (
    <>
      {isLoaded && (
        <>
          <div className="spots-display-container">
            {isOwned && (
              <>
                <EditSpotModal id={id} />
                <button
                  className="delete-spot-button"
                  onClick={handleDeleteSpot}
                >
                  {" "}
                  Delete{" "}
                </button>
              </>
            )}
            <div className="spots-title-container">
              <div className="spot-title">{spot.name}</div>
            </div>
            <div className="gallery-wrapper">
              hi
              {/* {spot.images.map((spot) => {
                    return <img src="" alt="images" />;
                  })} */}
            </div>
            <div className="review-container">
              <h3>Reviews</h3>
              <AddReviewModal spotId={id} />
              {noReviews &&
                reviews.map((review) => {
                  return (
                    <div key={review.id} className="single-review-container">
                      <span>{`${review.User.firstName} ${review.User.lastName}`}</span>
                      <div className="review-text-wrapper">
                        <p>{`${review.review}`}</p>
                      </div>
                      {review.User.id === user?.id && (
                        <>
                          <EditReviewModal spotId={id} reviewId={review.id} />
                          <button onClick={() => handleDeleteReview(review.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SpotsDisplay;
