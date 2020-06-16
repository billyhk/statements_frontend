import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import '../User/User.css';

const TransactionForm = (props) => {
	return (
		<>
			<form className='transaction-form-container' onSubmit={props.handleSubmit}>
				<label className='make-center' id='user-form-label' htmlFor='Transaction Type'>
					Transaction Type
				</label>
				{props.formSelectTag}
				{props.transactionInputs}
				<div className='text-center mt-4'>
					<button className='btn btn-blue' type='submit'>
						Submit
					</button>
					<Link to='/user/all-transactions' className='btn btn-dark'>
						Cancel and Go to All Transactions
					</Link>
				</div>
			</form>
		</>
	);
};

export default TransactionForm;
