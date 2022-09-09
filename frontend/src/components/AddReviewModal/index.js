import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./AddReviewModal";
import "./AddReviewModal.css";
import { useSelector } from "react-redux";

const AddReviewModal = (props) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {sessionUser && (
        <button className="add-edit-button" onClick={() => setShowModal(true)}>
          Add Review
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm spotId={props.spotId} />
        </Modal>
      )}
    </>
  );
};

export default AddReviewModal;
