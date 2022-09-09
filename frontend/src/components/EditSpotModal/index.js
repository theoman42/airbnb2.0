import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsForm from "./EditSpotModal";
import "./EditSpotModal.css";
import { useSelector } from "react-redux";

const EditSpotModal = (props) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {sessionUser && (
        <button
          className="spot-display-buttons"
          onClick={() => setShowModal(true)}
        >
          Edit Spot
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotsForm onClose={() => setShowModal(false)} id={props.id} />
        </Modal>
      )}
    </>
  );
};

export default EditSpotModal;
