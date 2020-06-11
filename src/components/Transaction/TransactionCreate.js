import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../../config';
import TransactionForm from './TransactionForm';

import '../User/User.css';


const NewTransaction = (props) => {
	const [newTransaction, setNewTransaction] = useState({});
	const [transactionDetail, setTransactionDetail] = useState({});
	const [transactionTypes, setTransactionTypes] = useState({});
	const [createdId, setCreatedId] = useState(null);
	const [transactionInputs, setTransactionInputs] = useState([]);

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

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `${APIURL}/api/transaction/new`;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
			body: JSON.stringify(newTransaction),
		})
			.then((response) => response.json())
			.then((data) => {
				setCreatedId(Object.keys(data).map((key) => data[key].id)[0]);
			})
			.catch((error) => console.error);
	};

	const handleDropdownSelect = (event) => {
		setTransactionInputs([]);
		let inputs = Object.entries(transactionTypes[event.target.value]).map(
			([key, value]) => {
				return (
					<>
						<label key={key} id='user-form-label' htmlFor={key}>
							{props.toTitleCase(key)}
						</label>
						<input
							required
							key={key + event.target.value}
							type={value}
							name={key}
							onChange={handleChange}
						/>
					</>
				);
			}
		);
		setTransactionInputs(inputs);
		newTransaction[event.target.value] = {};
		setNewTransaction(newTransaction);
		setTransactionDetail(() => {});
	};

	const handleChange = (event) => {
		event.persist();
		let newData = {};
		newData[event.target.name] = event.target.value;
		setNewTransaction((data) => {
			Object.keys(data).forEach((key) => {
				data[key] = {
					...data[key],
					...newData,
				};
			});
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

	let formSelectTag = (
		<select
			required
			name='Transaction Type'
			id='form-transaction-type'
			onChange={(event) => {
				handleDropdownSelect(event);
			}}>
			<option selected disabled hidden>
				Select Transaction Type
			</option>
			{transactionTypesOptions}
		</select>
	);


	if (createdId) {
		return <Redirect to={`/user/transaction/${createdId}`} />;
	}

	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>Record a New Transaction</p>
			<TransactionForm
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				transactionTypes={transactionTypesOptions}
				handleDropdownSelect={handleDropdownSelect}
				transactionInputs={transactionInputs}
				onClick={props.scrollUp}
				formSelectTag={formSelectTag}
			/>
		</div>
	);
};

export default NewTransaction;
