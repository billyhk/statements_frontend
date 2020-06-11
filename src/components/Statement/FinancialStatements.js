import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import Table from 'react-bootstrap/Table';

import '../Transaction/Transaction.css';
import '../User/User.css';

const FinancialStatement = (props) => {
	const [statement, setStatement] = useState({});
	const [error, setError] = useState(false);

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		await fetch(`${APIURL}/api/statement`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			body: {}
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setStatement(data);
				console.log(data);
			})
			.catch(() => {
				setError(true);
			});
    }
    console.log(statement)


	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>Financial Statements</p>
			<Table></Table>
			<Table></Table>
			<Table></Table>
		</div>
	);
};

export default FinancialStatement;
