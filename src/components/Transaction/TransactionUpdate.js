import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../../config';
import TransactionForm from './TransactionForm';

import './Transaction.css';
import '../User/User.css';

const TransactionUpdate = (props) => {
	const [updatedTransaction, setUpdatedTransaction] = useState({});
	const [transactionDetail, setTransactionDetail] = useState({});
	const [transactionTypes, setTransactionTypes] = useState({});
	const [createdId, setCreatedId] = useState(null);
	const [transactionInputs, setTransactionInputs] = useState([]);
	const [transaction, setTransaction] = useState({ temp: {} });

	let transactionId = props.match.params.id;

	useEffect(() => {
		const url = `${APIURL}/api/transaction/types`;
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${props.userToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setTransactionTypes(data);
			})
			.catch(() => {
				console.error();
			});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
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
				const inputs = Object.entries(
					Object.entries(data).map(([key, value]) => {
						// transactionType = key;
						return value;
					})[0]
				).map(([key, value]) => {
					return (
						<>
							<label key={key} id='user-form-label' htmlFor={key}>
								{props.toTitleCase(key)}
							</label>
							<input
								required
								id='user-update-input'
								key={key}
								type={value}
								name={key}
								onChange={handleChange}
								defaultValue={value}></input>
						</>
					);
				});
				setTransactionInputs(inputs);
				// setTransactionInputs(<div>Hi</div>);
			})
			.catch(() => {
				console.error();
			});
		// eslint-disable-next-line
	}, []);
	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `${APIURL}/api/transaction/${transactionId}`;
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
			body: JSON.stringify(updatedTransaction),
		})
			.then((response) => response.json())
			.then((data) => {
				setCreatedId(transactionId);
			})
			.catch((error) => console.error);
	};

	let inputValues = '';
	let dropdownValue = '';
	inputValues = Object.entries(
		Object.entries(transaction).map(([key, value]) => {
			dropdownValue = <span className='fixed-transaction-type'>{props.toTitleCase(key)}</span>;
			return value;
		})[0]
	).map(([key, value]) => {
		return value;
	});

	const handleChange = (event) => {
		event.persist();
		let newData = {};
		newData[event.target.name] = event.target.value;
		setUpdatedTransaction((data) => {
			Object.keys(data).forEach((key) => {
				data[key] = {
					...data[key],
					...newData,
				};
			});
			console.log(data)
			return data;
		});
	};

	const transactionTypesOptions = Object.keys(transactionTypes).map((item) => {
		return (
			<option value={item} key={item}>
				{props.toTitleCase(item)}
			</option>
		);
	});

	if (createdId) {
		return <Redirect to={`/user/transaction/${transactionId}`} />;
	}

	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>
				{`Update Transaction #${transactionId}`}
			</p>
			<TransactionForm
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				transactionTypes={transactionTypesOptions}
				transactionInputs={transactionInputs}
				inputValues={inputValues}
				onClick={props.scrollUp}
				formSelectTag={dropdownValue}
			/>
		</div>
	);
};

export default TransactionUpdate;
