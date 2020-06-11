import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Link, Redirect } from 'react-router-dom';

import './User.css';

const User = (props) => {
	const [user, setUser] = useState(null);
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		props.scrollUp();
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
			"This action will delete the current user. Please type 'confirm' to delete",
			''
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
				<div className='home-title'>Loading...</div>
			) : (
				<div>
					<p>
						<span className='user-detail-header'>Account Information</span>
					</p>
					<div className='user-account-info'>
						<p>
							<span className='user-detail-key'>First Name:</span>
						</p>
						<p>
							<span className='user-detail-value'>{user.firstname}</span>
						</p>
						<p>
							<span className='user-detail-key'>Last Name:</span>
						</p>
						<p>
							<span className='user-detail-value'>{user.lastname}</span>
						</p>
						<p>
							<span className='user-detail-key'>UserName:</span>
						</p>
						<p>
							<span className='user-detail-value'>{user.username}</span>
						</p>
						<p>
							<span className='user-detail-key'>Email:</span>
						</p>
						<p>
							<span className='user-detail-value'>{user.email}</span>
						</p>
						{!user.lastLogin ? null : (
							<>
								<p>
									<span className='user-detail-key'>Last Logged In:</span>
								</p>
								<p>
									<span className='user-detail-value'>{user.lastLogin}</span>
								</p>
							</>
						)}
						<p>
							<span className='user-detail-key'>Date Joined:</span>
						</p>
						<p>
							<span className='user-detail-value'>
								{user.dateJoined.substr(0, 10)}
							</span>
						</p>
					</div>
					<p>
						<span className='user-detail-header'>Control Panel</span>
					</p>
					<div className='user-detail-links'>
						<Link to='/user/new-transaction' onClick={props.scrollUp}>
							{'\u00b7 New Transaction'}
						</Link>
						<Link to='/user/all-transactions' onClick={props.scrollUp}>
							{'\u00b7 View Transaction History'}
						</Link>
						<Link to='/user/balance-statement' onClick={props.scrollUp}>
							{'\u00b7 View Balance Statement'}
						</Link>
					</div>
					<div className='user-detail-buttons'>
						<div className='mt-5 link'>
							<Link
								className='btn btn-info item'
								to='/user/edit'
								onClick={props.scrollUp}>
								Update Account Information
							</Link>
						</div>
						<button onClick={onDeleteUser} className='btn btn-danger item'>
							Delete Account
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default User;
