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
	const [transactionId, setTransactionId] = useState(props.match.params.id);
	const [thisTransactionValues, setTransactionValues] = useState('');

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
				console.log(Object.values(data).map((key) => data[key][0]));
				setTransactionValues(Object.values(data).map((key) => data[key][0]));
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

	const handleDropdownSelect = (event) => {
		setTransactionInputs([]);

		// let inputValues = Object.values(thisTransactionValues[event.target.value]).map((item) => {return item})

		let inputs = Object.entries(transactionTypes[event.target.value]).map(
			([key, value]) => {
				return (
					<>
						<label key={key} id='user-form-label' htmlFor={key}>
							{props.toTitleCase(key)}
						</label>
						<input
							defaultValue={thisTransactionValues}
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
		updatedTransaction[event.target.value] = {};
		setUpdatedTransaction(updatedTransaction);
		setTransactionDetail(() => {});
	};

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

	// const transactionTypesValues = Object.keys(transactionTypes).map((item) => {
	// 	return (
	// 		<option value={item} key={item}>
	// 			{props.toTitleCase(item)}
	// 		</option>
	// 	);
	// });

	// setTransactionValues = {}

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
				handleDropdownSelect={handleDropdownSelect}
				transactionInputs={transactionInputs}
				onClick={props.scrollUp}
			/>
		</div>
	);
};

export default TransactionUpdate;
