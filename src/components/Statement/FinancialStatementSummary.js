import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import FinancialStatements from './FinancialStatements';

import '../Transaction/Transaction.css';
import '../User/User.css';
import './FinancialStatements.css';

const FinancialStatementSummary = (props) => {
	const [statement, setStatement] = useState({
		income_statement: [],
		balance_sheet: [],
		cash_flow_statement: [],
	});
	const [error, setError] = useState(false);

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
				Authorization: `Bearer ${props.userToken}`,
			},
			body: JSON.stringify({}),
		})
			.then((response) => response.json())
			.then((data) => {
				setStatement(data);
			})
			.catch(() => {
				setError(true);
			});
	}

	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>Financial Statements</p>
			<FinancialStatements statement={statement} scrollUp={props.ScrollUp} toTitleCase={props.toTitleCase}/>
		</div>
	);
};

export default FinancialStatementSummary;