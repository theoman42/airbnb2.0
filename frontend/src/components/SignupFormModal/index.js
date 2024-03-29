import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from "./SignupForm";

const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="dropdown-buttons" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
