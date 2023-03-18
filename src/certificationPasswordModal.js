import React, { useState } from 'react';
import { Button, Input, Modal, Space } from 'antd';
import { useEffect } from 'react';

// TEMP TO BE REPLACED WITH CURRENT USER DATA
const USERNAME = "mifsud"
const NAME = "Aleandro Mifsud"

const CertModal = ({ isModalOpen, setIsModalOpen }) => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [canOK, setCanOK] = useState(false);

	useEffect(() => {
		if (password === confirmPassword && password.length > 0) {
			setCanOK(true);
		} else {
			setCanOK(false);
		}
	}, [confirmPassword, password]);

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};

	const handleOk = () => {
		fetch("/api/dss/certificate", {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'full_name': NAME,
				'password': password,
				'username': USERNAME
			})
		  }).then((response) => {
			  const status = response.status

			  if(status == 201) {
				setIsModalOpen(false);
			  }
		  });
	};

	return (
		<Modal
			title="New certificate password"
			open={isModalOpen}
			footer={[
				<Button type="primary" disabled={!canOK} onClick={handleOk}>
					Confirm
				</Button>,
			]}
		>
			<Space direction="vertical">
				<Input type="password" placeholder="Enter new password" value={password} onChange={handlePasswordChange} />
				<Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
			</Space>
		</Modal>
	);
};

export default CertModal;