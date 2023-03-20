import React from 'react';
import { Button } from 'antd';
import { logout } from './auth.js';

const Logout = () => {
  return (
    <Button
      onClick={() => logout()}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        margin: '10px',
        padding: '10px',
        fontSize: '16px',
      }}
    >
      Logout
    </Button>
  );
}

export default Logout;
