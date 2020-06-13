import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import Table from 'react-bootstrap/Table';

import '../Transaction/Transaction.css';
import '../User/User.css';
import './FinancialStatements.css';


const FinancialStatement = (props) => (
	<>
			{!props.statement ? (
				<div className='home-title'>Loading...</div>
			) : (
				<div>
					<Table>
						<div className='statement-section'>
							<p className='table-subheader'>Income Statement</p>
							<tbody id='statement-table-body'>
								{props.statement.income_statement.map((item) => {
									return (
										<tr
											id={
												item.line_item_order % 5 || item.line_item_order % 10
													? 'plain-text'
													: 'subtotal-text'
											}>
											<td>{props.toTitleCase(item.line_item)}</td>
											<td
												className={item.amount < 0 ? 'red-text' : 'plain-text'}>
												${item.amount === 0 ? '--' : item.amount}
											</td>
										</tr>
									);
								})}
							</tbody>
						</div>
						<div className='statement-section'>
							<p className='table-subheader'>Cash Flow Statement</p>
							<tbody id='statement-table-body'>
								{props.statement.cash_flow_statement.map((item) => {
									return (
										<tr
											id={
												item.line_item_order % 5 || item.line_item_order % 10
													? 'plain-text'
													: 'subtotal-text'
											}>
											<td>{props.toTitleCase(item.line_item)}</td>
											<td
												className={item.amount < 0 ? 'red-text' : 'plain-text'}>
												${item.amount === 0 ? '--' : item.amount}
											</td>
										</tr>
									);
								})}
							</tbody>
						</div>
						<div className='statement-section'>
							<p className='table-subheader'>Balance Sheet</p>
							<tbody id='statement-table-body'>
								{props.statement.balance_sheet.map((item) => {
									return (
										<tr
											id={
												item.line_item_order % 5 || item.line_item_order % 10
													? 'plain-text'
													: 'subtotal-text'
											}>
											<td>{props.toTitleCase(item.line_item)}</td>
											<td
												className={item.amount < 0 ? 'red-text' : 'plain-text'}>
												${item.amount === 0 ? '--' : item.amount}
											</td>
										</tr>
									);
								})}
							</tbody>
						</div>
					</Table>
				</div>
			)}
			</>
	);

export default FinancialStatement;
