import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsForm from "./AddSpotModal";
import "./AddSpotModal.css";
import { useSelector } from "react-redux";

const AddSpotModal = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {sessionUser && (
        <button className="add-spot-button" onClick={() => setShowModal(true)}>
          Add Spot
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotsForm />
        </Modal>
      )}
    </>
  );
};

export default AddSpotModal;
