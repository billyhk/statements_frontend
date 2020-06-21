import React from 'react';
import { Link } from 'react-router-dom';

import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';

import '../Transaction/Transaction.css';
import '../User/User.css';
import './FinancialStatements.css';
import '../Modal/Modal.css';

const FinancialStatement = (props) => {
	// function handleOverlay(item) {
	// 	console.log(item);
	// 	return <div className='overlay'>{JSON.stringify(item.tr_list)}</div>;
	// }
	const { isShowing, toggle } = useModal();
	return (
		<>
			{!props.statement ? (
				<div className='home-title'>Loading...</div>
			) : (
				<table className='financial-statements-table'>
					<div className='statement-section'>
						<p className='table-subheader'>Income Statement</p>
						<tbody id='statement-table-body'>
							{props.statement.income_statement.map((item) => {
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
											className={item.amount < 0 ? 'red-text' : 'plain-text'}
											onMouseEnter={(e) => {
												if (e.target.firstElementChild) {
													e.target.firstElementChild.className = 'overlay';
												}
											}}
											onMouseLeave={(e) => {
												if (e.target.firstElementChild) {
													e.target.firstElementChild.className =
														'overlay hidden';
												}
											}}>
											<div className='overlay hidden'>
												{item.tr_list.map((tr) => {
													return (
														<>
															<p>
																<Link to={`/user/transaction/${tr.id}`}>
																	{`${tr.id}`}&nbsp;
																</Link>
															</p>
														</>
													);
												})}
											</div>
											{item.currency_format}
											{item.amount === 0 ? '--' : item.amount}
										</td>

										{/* <td className={item.amount < 0 ? 'red-text' : 'plain-text'}>
											<div onClick={toggle}>
												{item.currency_format}
												{item.amount === 0 ? '--' : item.amount}
											</div>
										</td>
										<Modal
											isShowing={isShowing}
											hide={toggle}
											tr_list={item.tr_list.map((tr) => {
												return (
													<>
														<p>
															<Link to={`/user/transaction/${tr.id}`}>
																{`${tr.id}`}&nbsp;
															</Link>
														</p>
													</>
												);
											})}
										/> */}
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
											className={item.amount < 0 ? 'red-text' : 'plain-text'}
											onMouseEnter={(e) => {
												if (e.target.firstElementChild) {
													e.target.firstElementChild.className = 'overlay';
												}
											}}
											onMouseLeave={(e) => {
												if (e.target.firstElementChild) {
													e.target.firstElementChild.className =
														'overlay hidden';
												}
											}}>
											<div className='overlay hidden'>
												{item.tr_list.map((tr) => {
													return (
														<>
															<p>
																<Link to={`/user/transaction/${tr.id}`}>
																	{`${tr.id}`}&nbsp;
																</Link>
															</p>
														</>
													);
												})}
											</div>
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
											className={item.amount < 0 ? 'red-text' : 'plain-text'}
											onMouseEnter={(e) => {
												if (e.target.firstElementChild) {
													e.target.firstElementChild.className = 'overlay';
												}
											}}
											onMouseLeave={(e) => {
												if (e.target.firstElementChild) {
													e.target.firstElementChild.className =
														'overlay hidden';
												}
											}}>
											<div className='overlay hidden'>
												{item.tr_list.map((tr) => {
													return (
														<>
															<p>
																<Link to={`/user/transaction/${tr.id}`}>
																	{`${tr.id}`}&nbsp;
																</Link>
															</p>
														</>
													);
												})}
											</div>
											{item.currency_format}
											{item.amount === 0 ? '--' : item.amount}
										</td>
									</tr>
								);
							})}
						</tbody>
					</div>
				</table>
			)}
		</>
	);
};

export default FinancialStatement;
