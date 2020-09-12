import React, { FC } from 'react';
import { blah, test } from 'store/actions';

const deets = {
  email: 'athers_05@hotmail.co.uk',
  password: 'Password123!',
  firstName: 'Mike',
  lastName: 'Atehrton',
};
const Register: FC = () => (
  <div>
    <button
      onClick={async () => {
        await blah();
      }}
    >
      login
    </button>
    <button
      onClick={async () => {
        await test();
      }}
    >
      test
    </button>
  </div>
);

export default Register;
