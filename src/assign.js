import React, { useState, useEffect } from 'react';
import { Button, Modal, Select   } from 'antd';
import opaData from './opaServices.js';


const Popup = ({isModalOpen, setIsModalOpen, options, record}) => {

  const handleOk = () => {
    fetch('/api/userRightsWipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document_id: record.document_id,
      }),
    })

    // send the selected items to api/userRightsAddMany with the document_id from record
    fetch('/api/userRightsAddMany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document_id: record.document_id,
        user_ids: selectedItems
      }),
    })
    .then((response) => {
      opaData.uploadOpaData()
      setIsModalOpen(false);
    })
    // then close the modal

    };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // TODO: fetch the users associated with the document and set them as selectedItems
    // Until then, just clear the selected items when the modal is opened
    setSelectedItems([])
  }, [record])

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
                  // show only the user_email in the dropdown but send the whole object to the backend
                  label: item.user_email,
                  value: item.user_id
                }))}
                />
      </Modal>
  );
};

export default Popup;
