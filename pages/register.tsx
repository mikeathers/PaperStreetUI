import React, { FC } from "react";
import { register, blah } from "store/actions";

const deets = { email: "", password: "", displayName: "" };
const Register: FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          blah();
          register(deets);
        }}
      >
        test
      </button>
    </div>
  );
};

export default Register;
