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
	const [periods, setPeriods] = useState([]);

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

	useEffect(() => {
		fetch(`${APIURL}/api/statement/periods`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setPeriods(data);
			})
			.catch(console.error);
		// eslint-disable-next-line
	}, []);

	function handleChange(event) {
		let range = JSON.parse(event.target.value);
		console.log(range, event.target.value)
		fetch(`${APIURL}/api/statement`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
			body: JSON.stringify(range),
		})
			.then((response) => response.json())
			.then((data) => {
				setStatement(data);
			})
			.catch(() => {
				setError(true);
			});
	}

	let options = periods.map((period) => {
		return (
			<option
			value={JSON.stringify({begin_date: period.begin_date,
				end_date: period.end_date,})}
				selected = {periods[periods.length - 1]}
				>
				{period.period}
			</option>
		);
	});

	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>Financial Statements</p>
			<select className='q-selector' onChange={(e) => handleChange(e)}>{options}</select>
			<FinancialStatements
				statement={statement}
				scrollUp={props.ScrollUp}
				toTitleCase={props.toTitleCase}
			/>
		</div>
	);
};

export default FinancialStatementSummary;
