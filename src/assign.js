import React, { useState, useEffect } from 'react';
import { Button, Modal, Select   } from 'antd';

// TODO get users from backend
// useEffect(() => {
//   fetch("/api/cognito/listUsers")
//     .then(res => {
//       OPTIONS = res.body;
//     }
//       )
// }, [])

// userEvent.Attributes
// username




const Popup = ({isModalOpen, setIsModalOpen, options}) => {
  // call getOptions() to get users from backend ONCE
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const [selectedItems, setSelectedItems] = useState([]);
  if (!options) {
    return null;
  }
  const filteredOptions = options.filter((o) => !selectedItems.includes(o))

  return (
      <Modal title="Associated users" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                    width: '100%',
                }}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
                />
      </Modal>
  );
};

export default Popup;
