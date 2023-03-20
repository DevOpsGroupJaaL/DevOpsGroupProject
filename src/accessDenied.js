import { Result } from 'antd';
import React from 'react';

const AccessDenied = () => {
    return (
        <Result
        status="warning"
        title="Access Denied. You are not authorised to view this document!"
        />
    );
};


export default AccessDenied;
