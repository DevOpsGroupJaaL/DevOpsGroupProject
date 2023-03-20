import React, { useState } from 'react';
import { Button, Input, Modal, Space } from 'antd';
import { useEffect } from 'react';



let randomEmail = () => {
	return Math.random().toString(36).substring(7) + '@test.com';
};


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
		let email = randomEmail();
		console.log('creating user for ' + email);
		// TODO: get current user's email via cognito

		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({'email': email}),
		})
			.then((response) => console.log(response));
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
