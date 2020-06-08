import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../../config';
import TransactionForm from './TransactionForm'

const NewTransaction = (props) => {
	const initialTransactionState = {
		transactionType: '',
		amount: '',
	};
	const [transaction, setTransaction] = useState(initialTransactionState);
	const [createdId, setCreatedId] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `${APIURL}/api/user/transactions`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
			body: JSON.stringify(transaction),
		})
			.then((response) => response.json())
			.then((data) => {
				setCreatedId(data._id);
			})
			.catch((error) => console.error);
	};

	const handleChange = (event) => {
		event.persist();
		setTransaction({
			...transaction,
			[event.target.name]: event.target.value,
		});
	};

	if (createdId) {
		return <Redirect to={'/api/user/all-transactions'} />;
	}

	return (
		<>
			<TransactionForm
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default NewTransaction;
