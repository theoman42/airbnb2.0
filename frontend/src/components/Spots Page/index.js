import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Reviews.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
};
