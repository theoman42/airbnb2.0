import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./Spots.css";
import { getSpots } from "../../store/spots";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spots));
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <main className="page-container">
      <div className="spots-page-wrapper">
        <div className="grid-container">
          {spots.map((spot) => {
            return (
              <NavLink
                key={spot.id}
                to={`/spots/${spot.id}`}
                className="grid-item"
              >
                <div>
                  <div className="main-image-wrapper">
                    <img
                      className="main-page-spot-images"
                      src={spot.previewImage}
                      alt="airbnb-spot"
                    />
                  </div>
                  <div className="spot-descriptions-grid">
                    <div className="description-item-1">{`${spot.name}`}</div>
                    <div className="description-item-2">{`$${spot.price} night`}</div>
                    <div className="description-item-3">{`${spot.city}, ${spot.country}`}</div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default SpotsPage;

//WHEN YOU COME BACK, Remember this:
// You just added the useEffect, which if it works will load everything, but you need to
// go back to the reducer and make sure it loads into the actual store,
//then useSelector to map into an array and then render that to the front end.
