import React, { useState } from 'react';
import { Button, Input, Modal, Space } from 'antd';
import { useEffect } from 'react';



let randomEmail = () => {
	return Math.random().toString(36).substring(7) + '@test.com';
};


const CertModal = ({ isModalOpen, setIsModalOpen, user}) => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [canOK, setCanOK] = useState(false);
	const username = user.username;
	const name = user.name;

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

	const handleCancel = () => {
		console.log(user)
	};
	const handleOk = () => {
		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({'email': user.email}),
		})

		fetch("/api/dss/certificate", {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'full_name': user.name,
				'password': password,
				'username': user.username
			})
		  }).then((response) => {
			  const status = response.status

			  if(status === 201) {
				setIsModalOpen(false);
			  }
		  });
	};

	return (
		<Modal
			title="New certificate password"
			open={isModalOpen}
			onCancel={handleCancel}
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
