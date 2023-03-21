import React from 'react';
import { Button } from 'antd';
import { logout } from './auth.js';

const Logout = () => {
  return (
    <Button
      ghost
      type="default"
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
}

export default Logout;
