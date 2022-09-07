import "./SpotsDisplay.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteOwnerSpot, getOneSpot, getSpots } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";

const SpotsDisplay = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const spot = useSelector((state) => state.spots.currentSpot);
  const user = useSelector((state) => state.session.user);

  const handleDelete = () => {
    dispatch(deleteOwnerSpot(id));
    dispatch(getSpots());
    history.push("/");
  };

  useEffect(() => {
    dispatch(getOneSpot(id)).then(() => setIsLoaded(true));
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
                <button className="delete-spot-button" onClick={handleDelete}>
                  {" "}
                  Delete{" "}
                </button>
              </>
            )}
            <div className="spots-title-container">
              <div className="spot-title">{spot.name}</div>
              <div className="gallery-wrapper">
                {/* {spot.images.map((spot) => {
                    return <img src="" alt="images" />;
                  })} */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SpotsDisplay;
