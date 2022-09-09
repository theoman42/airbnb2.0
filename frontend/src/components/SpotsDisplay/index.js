import "./SpotsDisplay.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteOwnerSpot, getOneSpot, getSpots } from "../../store/spots";
import { getReviewsfromSpotId, deleteOneReview } from "../../store/reviews";
import EditSpotModal from "../EditSpotModal";
import EditReviewModal from "../EditReviewModal";
import AddReviewModal from "../AddReviewModal";
import ReviewTitleComponent from "./Reviews";

const SpotsDisplay = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [errors, setErrors] = useState([]);

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
    if (spot) {
      dispatch(getReviewsfromSpotId(spot.id)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
  }, [spot]);

  useEffect(() => {
    console.log("one");
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneSpot(id)).then(() => setIsLoaded(true));
    dispatch(getReviewsfromSpotId(id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
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
    <main className="page-container">
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
              <h1 className="spot-title">{spot.name}</h1>
              <div className="meta-data-holder">
                <ReviewTitleComponent />
                <div className="">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
              </div>
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
              {reviews.map((review) => {
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
    </main>
  );
};

export default SpotsDisplay;
