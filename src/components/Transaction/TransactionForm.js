import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import '../User/User.css';


const TransactionForm = (props) => {
	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<label id='user-form-label' htmlFor='Transaction Type'>
					Transaction Type
				</label>

				<select
					required
					name='Transaction Type'
					onChange={(event) => {
						// props.handleChange(event);
						props.handleDropdownSelect(event);
					}}>
					<option selected disabled hidden>
						Select Transaction Type
					</option>
					{props.transactionTypes}
				</select>
				{props.transactionInputs}
				<div className='text-center mt-4'>
					<MDBBtn color='indigo' className='button-text' type='submit'>
						Submit
					</MDBBtn>
					<Link to='/user/all-transactions' className='btn btn-link'>
						<MDBBtn color='black'>Cancel and Return to All Transaction</MDBBtn>
					</Link>
				</div>
			</form>
		</>
	);
};

export default TransactionForm;
