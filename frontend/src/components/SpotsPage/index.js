import React, { useEffect, useStat } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./Spots.css";
import { getSpots } from "../../store/spots";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const spots = Object.values(useSelector((state) => state.spots));
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);
  //Retrieve an array of all spots;
  //map through all spots
  return (
    <main>
      <div className="grid-container">
        {spots.map((spot) => {
          return (
            <NavLink
              key={spot.id}
              to={`/spots/${spot.id}`}
              className="grid-item"
            >
              <div className="">{spot.id}</div>
            </NavLink>
          );
        })}
      </div>
    </main>
  );
};

export default SpotsPage;

//WHEN YOU COME BACK, Remember this:
// You just added the useEffect, which if it works will load everything, but you need to
// go back to the reducer and make sure it loads into the actual store,
//then useSelector to map into an array and then render that to the front end.
