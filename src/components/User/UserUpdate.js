import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config.js';
import { Redirect } from 'react-router-dom';
import UserForm from './UserForm.js';

const UserUpdate = (props) => {
	const [user, setUser] = useState({});
	const [updated, setUpdated] = useState(false);
	const [error, setError] = useState(false);

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	useEffect(() => {
		const url = `${APIURL}/api/user`;
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then(setUser)
			.catch(() => {
				setError(true);
			});
		//eslint-disable-next-line
	}, []);

	const handleChange = (event) => {
		event.persist();
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		// event.preventDefault();
		const url = `${APIURL}/api/user`;

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then(setUser)
			.then((res) => {
				setUpdated(true);
			})
			.catch(() => {
				setError(true);
			});
	};
	if (updated) {
		return <Redirect to={'/user'} />;
	}

	return (
		<>
			<UserForm
				user={user}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				onKeyDown={handleKeyDown}
			/>
		</>
	);
};

export default UserUpdate;
