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
        <button className="dropdown-buttons" onClick={() => setShowModal(true)}>
          Edit
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm
            onClose={() => setShowModal(false)}
            spotId={props.spotId}
            reviewId={props.reviewId}
          />
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;
