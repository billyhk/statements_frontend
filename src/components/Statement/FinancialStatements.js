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
											id={item.line_format}>
											<td>{item.line_format === 'line-item' ? null : (<span id='sub-or-grand'>({props.toTitleCase(item.line_format)}) </span>)}{props.toTitleCase(item.line_item)}</td>
											<td
												className={item.amount < 0 ? 'red-text' : 'plain-text'}>
												{item.currency_format}{item.amount === 0 ? '--' : item.amount}
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
										<tr id={item.line_format}>
											<td>
												{item.line_format === 'line-item' ? null : (
													<span id='sub-or-grand'>
														({props.toTitleCase(item.line_format)}){' '}
													</span>
												)}
												{props.toTitleCase(item.line_item)}
											</td>
											<td
												className={item.amount < 0 ? 'red-text' : 'plain-text'}>
												{item.currency_format}
												{item.amount === 0 ? '--' : item.amount}
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
										<tr id={item.line_format}>
											<td>
												{item.line_format === 'line-item' ? null : (
													<span id='sub-or-grand'>
														({props.toTitleCase(item.line_format)}){' '}
													</span>
												)}
												{props.toTitleCase(item.line_item)}
											</td>
											<td
												className={item.amount < 0 ? 'red-text' : 'plain-text'}>
												{item.currency_format}
												{item.amount === 0 ? '--' : item.amount}
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
