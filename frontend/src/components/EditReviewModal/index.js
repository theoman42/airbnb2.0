import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./EditReviewModal";
import "./EditSpotModal.css";
import { useSelector } from "react-redux";

const EditReviewModal = (props) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {sessionUser && (
        <button className="add-edit-button" onClick={() => setShowModal(true)}>
          Edit
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm spotId={props.spotId} reviewId={props.reviewId} />
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;
