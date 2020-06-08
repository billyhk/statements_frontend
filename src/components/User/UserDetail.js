import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Link, Redirect } from 'react-router-dom';

const User = (props) => {
	const [user, setUser] = useState(null);
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const url = `${APIURL}/api/user`;
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
		let confirm = prompt(
			"This action will delete the current user. Please type 'confirm' to delete", ''
		);
		if (confirm === 'confirm') {
			const url = `${APIURL}/api/user`;
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
		}
	};
	if (deleted) {
		props.handleSignOut();
		return <Redirect to='/signin' />;
	}

	return (
		<div className='user-account-wrapper'>
			{!user ? (
				<div className='home-title'>
					Loading...
				</div>
			) : (
				<>
					<div className='user-account-info'>
						<h1>Your Account</h1>
						<h2>{user.firstname}</h2>
						<h2>{user.lastname}</h2>
						<h2>{user.username}</h2>
						<h2>{user.email}</h2>

					</div>
					<Link to='/user/new-transaction'>Create New Transaction</Link>
					<Link to='/user/all-transactions'>View Your Transaction History</Link>
					<Link to='/user/balance-statement'>View Your Balance Statement</Link>

					<div className='mt-5 link'>
						<Link className='btn btn-info item' to='/user/edit'>
							Update Account Information
						</Link>
					</div>
					<button onClick={onDeleteUser} className='btn btn-danger item'>
						Delete Account
					</button>
				</>
			)}
		</div>
	);
};

export default User;
