import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Reviews.css";
import { getSpots } from "../../store/spots";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);
  //Retrieve an array of all spots;
  //map through all spots
  return <></>;
};

//WHEN YOU COME BACK, Remember this:
// You just added the useEffect, which if it works will load everything, but you need to
// go back to the reducer and make sure it loads into the actual store,
//then useSelector to map into an array and then render that to the front end.
