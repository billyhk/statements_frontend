import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import './User.css';

const UserForm = ({ onKeyDown, user, handleSubmit, handleChange }) => (
	<div className='user-account-wrapper'>
		<p className='user-detail-header'>Account Update</p>
		<MDBContainer>
			<MDBRow>
				<MDBCol md='12'>
					<form id='user-form'>
						<label id='user-form-label' htmlFor='firstname'>
							First Name
						</label>
						<input
							required
							type='firstname'
							id='user-update-input'
							placeholder='First Name'
							value={user.firstname}
							onChange={handleChange}
							name='firstname'
						/>
						<label id='user-form-label' htmlFor='Lastname'>
							Last Name
						</label>
						<input
							required
							type='lastname'
							id='user-update-input'
							placeholder='Last Name'
							value={user.lastname}
							onChange={handleChange}
							name='lastname'
						/>
						<label id='user-form-label' htmlFor='username'>
							Username
						</label>
						<input
							required
							type='username'
							id='user-update-input'
							placeholder='Username'
							value={user.username}
							onChange={handleChange}
							name='username'
						/>
						<label id='user-form-label' htmlFor='email'>
							Email
						</label>
						<input
							required
							type='email'
							id='user-update-input'
							placeholder='Email'
							value={user.email}
							onChange={handleChange}
							name='email'
						/>
						<label
							id='user-form-label-password'
							htmlFor='password'
							className='sign-in-text'>
							Password
						</label>
						<input
							required
							id='user-update-input'
							type='password'
							name='password'
							placeholder='Password'
							onChange={handleChange}
							onKeyDown={onKeyDown}
						/>
						<label
							id='user-form-label-password'
							htmlFor='passwordConfirm'
							className='sign-in-text'>
							Confirm Password
						</label>
						<input
							required
							id='user-update-input'
							type='password'
							name='passwordConfirm'
							placeholder='Confirm Password'
							onChange={handleChange}
							onKeyDown={onKeyDown}
						/>

						<div className='text-center mt-4'>
							<MDBBtn
								color='indigo'
								className='button-text'
								onClick={handleSubmit}>
								Update
							</MDBBtn>
							<Link to='/user' className='btn btn-link'>
								<MDBBtn color='black'>Cancel</MDBBtn>
							</Link>
						</div>
					</form>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	</div>
);

export default UserForm;
