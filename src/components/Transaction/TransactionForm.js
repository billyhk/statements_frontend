import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';


const TransactionForm = (props) => {
	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>Record a New Transaction</p>
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
					<option value='' selected disabled hidden>
						Select Transaction Type
					</option>
					{props.transactionTypes}
				</select>
				{props.transactionInputs}
				<div className='text-center mt-4'>
					<MDBBtn
						color='indigo'
                        className='button-text'
                        type='submit'
						>
						Submit
					</MDBBtn>
				</div>
			</form>
		</div>
	);
};

export default TransactionForm;
