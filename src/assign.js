import React, { useState } from 'react';
import { Button, Modal, Select   } from 'antd';

// TODO get users from backend
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const Popup = ({isModalOpen, setIsModalOpen}) => {

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

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