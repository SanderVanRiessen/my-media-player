import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
interface LocationState {
  state: {
    error: string;
  };
}
const Error = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const { state } = location as LocationState;
  const onClickHandler = () => {
    navigate("/");
  };
  return (
    <>
      <h1>{state.error || "Something went wrongs"}</h1>
      <Button onClick={onClickHandler}>Please try again</Button>
    </>
  );
};

export default Error;
