import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';
import Table from 'react-bootstrap/Table';

import './Transaction.css';
import '../User/User.css';


const TransactionsAll = (props) => {
	const [transactions, setTransactions] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		await fetch(`${APIURL}/api/transaction`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setTransactions(data);
			})
			.catch(() => {
				setError(true);
			});
	}

	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>Transaction History</p>
			{!transactions ? (
				<div className='home-title'>Loading...</div>
			) : (
				<Table>
					<thead>
						<tr>
							<th>
								<span className='transaction-detail-headers'>ID</span>
							</th>
							<th>
								<span className='transaction-detail-headers'>
									Transaction Type
								</span>
							</th>
							<th>
								<span className='transaction-detail-headers'>Transaction Date</span>
							</th>
							<th>
								<span className='transaction-detail-headers'>
									Accouting Date
								</span>
							</th>
						</tr>
					</thead>
					{transactions.map((transaction) => {
						return (
							<tbody key={transaction.id}>
								<tr>
									<td>{transaction.id}</td>
									<td>
										<Link to={`transaction/${transaction.id}`}>
											<span id='link-to-detail'>
												{props.toTitleCase(transaction.transaction_type)}
											</span>
										</Link>
									</td>
									<td>
										<span id='transaction-dates'>
											{transaction.transaction_date}
										</span>
									</td>
									<td>
										<span id='transaction-dates'>
											{transaction.accounting_date}
										</span>
									</td>
								</tr>
							</tbody>
						);
					})}
				</Table>
			)}
		</div>
	);
};

export default TransactionsAll;
