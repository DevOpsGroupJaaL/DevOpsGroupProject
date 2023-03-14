import React from 'react';
import { Button } from 'antd';

const Logout = () => {
  return (
    <Button
    //   onClick={() => logout({ returnTo: window.location.origin })}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        margin: '10px',
        padding: '10px',
        fontSize: '16px',
      }}
    >
      TODO Change to Logout Icon
    </Button>
  );
}

export default Logout;