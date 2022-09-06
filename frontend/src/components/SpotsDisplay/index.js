import "./SpotsDisplay.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSpot } from "../../store/spots";
import { getSpots } from "../../store/spots";

const SpotsDisplay = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.currentSpot);

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch]);

  return (
    <>
      <div className="spots-display-container"></div>
      <div className="spots-title-container">
        <div className="spot-title">{spot.name}</div>
        <div className="gallery-wrapper">
          {/* {spot.images.map((spot) => {
            return <img src="" alt="images" />;
          })} */}
        </div>
      </div>
    </>
  );
};

export default SpotsDisplay;
