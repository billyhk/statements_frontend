import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Link, Redirect } from 'react-router-dom';
import FinancialStatements from '../Statement/FinancialStatements';

import './Transaction.css';
import '../User/User.css';

const TransactionDetail = (props) => {
	const [transaction, setTransaction] = useState({ temp: {} });
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);
	const [statement, setStatement] = useState({
		income_statement: [],
		balance_sheet: [],
		cash_flow_statement: [],
	});

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		await fetch(`${APIURL}/api/statement`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({ transaction_list: [transactionId] }),
		})
			.then((response) => response.json())
			.then((data) => {
				setStatement(data);
			})
			.catch(() => {
				setError(true);
			});
	}

	const transactionId = props.match.params.id;

	useEffect(() => {
		props.scrollUp();
		const url = `${APIURL}/api/transaction/${transactionId}`;
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${props.userToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setTransaction(data);
			})
			.catch(() => {
				console.error();
			});
		// eslint-disable-next-line
	}, []);

	let transactionType = '';

	const details = Object.entries(
		Object.entries(transaction).map(([key, value]) => {
			transactionType = key;
			return value;
		})[0]
	).map(([key, value]) => {
		return (
			<>
				<p>
					<span className='user-detail-key'>{props.toTitleCase(key)}</span>
				</p>
				<p>
					<span className='user-detail-value'>{value}</span>
				</p>
			</>
		);
	});


	const onDeleteTransaction = (event) => {
		let confirm = prompt(
			"This action will delete the current transaction. Please type 'confirm' to delete",
			''
		);
		if (confirm === 'confirm') {
			const url = `${APIURL}/api/transaction/${transactionId}`;
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
		return <Redirect to='/user/all-transactions' />;
	}

	return (
		<div className='user-account-wrapper'>
			{!transaction ? (
				<div className='home-title'>Loading...</div>
			) : (
				<div>
					<p>
						<span className='user-detail-header'>{`Details for Transaction ID: ${transactionId}`}</span>
					</p>

					<div className='user-account-info'>
						<p>
							<span className='user-detail-key'>Transaction Type</span>
						</p>
						<p>
							<span className='user-detail-value'>
								{props.toTitleCase(transactionType)}
							</span>
						</p>
						{details}
					</div>
					<p className='user-detail-header'>
						Financial Impact of This Transaction
					</p>
					<FinancialStatements
						statement={statement}
						scrollUp={props.ScrollUp}
						toTitleCase={props.toTitleCase}
					/>

					<div className='user-detail-buttons'>
						<div id='transaction-detail-buttons' className='text-center mt-4'>
							<Link
								className='btn btn-info item'
								to={`/user/transaction/${transactionId}/edit`}
								onClick={props.scrollUp}>
								Update Transaction Information
							</Link>
							<Link
								className='btn btn-dark'
								to={`/user/all-transactions`}
								onClick={props.scrollUp}>
								Return To All Transactions
							</Link>
							<Link
								className='btn btn-light'
								to={`/user/financial-statements-summary`}
								onClick={props.scrollUp}>
								Go To Financial Statements Summary
							</Link>

							<button
								onClick={onDeleteTransaction}
								className='btn btn-danger item'>
								Delete Transaction
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TransactionDetail;
