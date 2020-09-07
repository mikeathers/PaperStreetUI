import React, { FC } from "react";
import { register, blah } from "store/actions";

const deets = {
  email: "athers_05@hotmail.co.uk",
  password: "Password123!",
  firstName: "Mike",
  lastName: "Atehrton",
};
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
