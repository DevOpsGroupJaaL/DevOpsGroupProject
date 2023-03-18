import React, { useState } from 'react';
import { Button, Input, Modal, Space } from 'antd';
import { useEffect } from 'react';

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
		// TODO send the pw to where ever
		console.log('send pw');
		setIsModalOpen(false);
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
