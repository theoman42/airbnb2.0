import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

const DemoLogin = () => {
  const dispatch = useDispatch();
  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({
        email: "Adam@user.io",
        password: "password",
      })
    );
  };
  return (
    <button className="demo-button" onClick={demoLogin}>
      Demo
    </button>
  );
};

export default DemoLogin;
