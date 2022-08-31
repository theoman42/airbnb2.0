import React, { useEffect, useStat, Navlink } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Spots.css";
import { getSpots } from "../../store/spots";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const spots = Object.values(useSelector((state) => state.spots));
  console.log(spots);
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);
  //Retrieve an array of all spots;
  //map through all spots
  return (
    <main>
      <nav>
        {spots.map((spot) => {
          <div>hi</div>;
        })}
      </nav>
    </main>
  );
};

export default SpotsPage;

//WHEN YOU COME BACK, Remember this:
// You just added the useEffect, which if it works will load everything, but you need to
// go back to the reducer and make sure it loads into the actual store,
//then useSelector to map into an array and then render that to the front end.
