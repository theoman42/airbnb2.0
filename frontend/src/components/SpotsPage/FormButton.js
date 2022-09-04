import "./FormButton.css";
import { useSelector } from "react-redux";

const FormButtons = (props) => {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="form-button-wrapper">
        <div className="form-button add-spot" onClick={props.onClick}>
          Add Spot
        </div>
        <div className="form-button edit-spot" onClick={props.onClick}>
          Edit Spot
        </div>
      </div>
    );
  } else {
    sessionLinks = <></>;
  }
  return sessionLinks;
};

export default FormButtons;
