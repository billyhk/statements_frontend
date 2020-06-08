import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Link, Redirect } from 'react-router-dom';

const User = (props) => {
	const [user, setUser] = useState(null);
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const url = `${APIURL}/api/user/`;
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${props.userToken}`,
			},
		})
			.then((response) => response.json())
			.then(setUser)
			.catch(() => {
				setError(true);
			});
		// eslint-disable-next-line
	}, []);

	const onDeleteUser = (event) => {
		const url = `${APIURL}/api/user/`;
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
		})
			.then((res) => {
				setDeleted(true);
			})
			.catch(console.error);
	};
	if (deleted) {
		props.handleSignOut();
		return <Redirect to='/' />;
	}

    return (
		<div className='user-account-wrapper'>
			{!user ? (
				<div className='home-title'>Sorry, there was a problem getting the users</div>
			) : (
				<div className='user-account-info'>
					<h1>User Account</h1>
				</div>
			)}{' '}
		</div>
	);
};

export default User;
