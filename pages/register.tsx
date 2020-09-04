import React, { FC } from "react";
import { useDispatch } from "react-redux";

const Register: FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch({ type: "REGISTER", payload: 1 })}>
        test
      </button>
    </div>
  );
};

export default Register;
