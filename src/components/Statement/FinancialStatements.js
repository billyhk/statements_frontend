import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import Table from 'react-bootstrap/Table';

import '../Transaction/Transaction.css';
import '../User/User.css';
import './FinancialStatements.css';

const FinancialStatement = (props) => {
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
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
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

			{!statement ? (
				<div className='home-title'>Loading...</div>
			) : (
				<div>
					<Table>
						<div className='statement-section'>
							<p className='table-subheader'>Income Statement</p>
							<tbody id='statement-table-body'>
									{statement.income_statement.map((item) => {
										return (
											<tr
												id={
													item.line_item_order % 5 || item.line_item_order % 10
														? 'plain-text'
														: 'subtotal-text'
												}>
												<td>{props.toTitleCase(item.line_item)}</td>
												<td
													className={
														item.amount < 0 ? 'red-text' : 'plain-text'
													}>
													${item.amount}
												</td>
											</tr>
										);
									})}
								</tbody>
					</div>
						<div className='statement-section'>
							<p className='table-subheader'>Cash Flow Statement</p>
							<tbody id='statement-table-body'>
									{statement.cash_flow_statement.map((item) => {
										return (
											<tr id={item.line_item_order % 5 || item.line_item_order % 10 ? 'plain-text' : 'subtotal-text'}>
												<td>{props.toTitleCase(item.line_item)}</td>
												<td
													className={
														item.amount < 0 ? 'red-text' : 'plain-text'
													}>
													${item.amount}
												</td>
											</tr>
										);
									})}
								</tbody>
					</div>
						<div className='statement-section'>
							<p className='table-subheader'>Balance Sheet</p>

								<tbody id='statement-table-body'>
									{statement.balance_sheet.map((item) => {
										return (
											<tr
												id={
													item.line_item_order % 5 || item.line_item_order % 10
														? 'plain-text'
														: 'subtotal-text'
												}>
												<td>{props.toTitleCase(item.line_item)}</td>
												<td
													className={
														item.amount < 0 ? 'red-text' : 'plain-text'
													}>
													${item.amount}
												</td>
											</tr>
										);
									})}
								</tbody>
					</div>
					</Table>
				</div>
			)}
		</div>
	);
};

export default FinancialStatement;
