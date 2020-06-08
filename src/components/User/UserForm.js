import React from 'react';
import { Link } from 'react-router-dom';

const UserForm = ({ user, handleSubmit, handleChange }) => (
	<form onSubmit={handleSubmit}>
		<div className='form-row'>
			<div className='form-group col-md-6'>
				<label htmlFor='email'>First Name</label>
				<input
				required
					type='firstname'
					className='form-control'
					id='firstname'
					placeholder='First Name'
					value={user.firstname}
					onChange={handleChange}
					name='firstname'
				/>
			</div>
			<div className='form-group col-md-6'>
				<label htmlFor='Lastname'>Last Name</label>
				<input
				required
					type='lastname'
					className='form-control'
					id='lastname'
					placeholder='Last Name'
					value={user.lastname}
					onChange={handleChange}
					name='lastname'
				/>
			</div>
		</div>
		<div className='form-row'>
			<div className='form-group col-md-6'>
				<label htmlFor='username'>Username</label>
				<input
				required
					type='username'
					className='form-control'
					id='username'
					placeholder='Email'
					value={user.username}
					onChange={handleChange}
					name='username'
				/>
			</div>
			<div className='form-row'>
				<div className='form-group col-md-6'>
					<label htmlFor='email'>Email</label>
					<input
					required
						type='email'
						className='form-control'
						id='email'
						placeholder='Email'
						value={user.email}
						onChange={handleChange}
						name='email'
					/>
				</div>
				<label htmlFor='password' className='sign-in-text'>
					Password
				</label>
				<input
					required
					className='form-control'
					type='password'
					id='password'
					name='password'
					onChange={handleChange}
				/>
				<br />
				<label htmlFor='passwordConfirm' className='sign-in-text'>
					Confirm Password
				</label>
				<input
					required
					className='form-control'
					type='password'
					id='passwordConfirm'
					name='passwordConfirm'
					onChange={handleChange}
				/>
			</div>
		</div>
		<button type='submit'>Submit</button>
		<Link to={`/user`} className='btn btn-link'>
			Cancel
		</Link>
	</form>
);

export default UserForm;
