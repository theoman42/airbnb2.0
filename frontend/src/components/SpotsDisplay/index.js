import "./SpotsDisplay.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteOwnerSpot, getOneSpot, getSpots } from "../../store/spots";
import { getReviewsfromSpotId } from "../../store/reviews";
import EditSpotModal from "../EditSpotModal";

const SpotsDisplay = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [isReviewOwned, setisReviewOwned] = useState(false);
  const spot = useSelector((state) => state.spots.currentSpot);
  const user = useSelector((state) => state.session.user);
  const reviews = Object.values(useSelector((state) => state.reviews));

  const handleDeleteSpot = () => {
    dispatch(deleteOwnerSpot(id));
    dispatch(getSpots());
    history.push("/");
  };

  const handleEditReview = () => {
    dispatch();
  };

  const handleDeleteReview = () => {
    dispatch();
  };

  useEffect(() => {
    dispatch(getOneSpot(id)).then(() => setIsLoaded(true));
    dispatch(getReviewsfromSpotId(id));
  }, [id, dispatch]);

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
              {reviews.map((review) => {
                return (
                  <div key={review.id} className="single-review-container">
                    <span>{`${review.User.firstName} ${review.User.lastName}`}</span>
                    <p>{`${review.review}`}</p>
                    {review.User.id === user?.id && (
                      <>
                        <button onClick={handleEditReview}> Edit </button>
                        <button onClick={handleDeleteReview}> Delete </button>
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
