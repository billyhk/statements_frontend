import React from 'react';
import { Link } from 'react-router-dom';

const UserForm = ({ user, handleSubmit, handleChange }) => (
	<form onSubmit={handleSubmit}>
		<div className='form-row'>
			<div className='form-group col-md-6'>
				<label htmlFor='email'>First Name</label>
				<input
					type='firstname'
					className='form-control'
					id='firstname'
					placeholder='First Name'
					value={user.firstname}
					onChange={handleChange}
					name='firstname'
					required
				/>
			</div>
			<div className='form-group col-md-6'>
				<label htmlFor='Lastname'>Last Name</label>
				<input
					type='lastname'
					className='form-control'
					id='lastname'
					placeholder='Last Name'
					value={user.lastname}
					onChange={handleChange}
					name='lastname'
					required
				/>
			</div>
		</div>
		<div className='form-row'>
			<div className='form-group col-md-6'>
				<label htmlFor='username'>Username</label>
				<input
					type='username'
					className='form-control'
					id='username'
					placeholder='Email'
					value={user.username}
					onChange={handleChange}
					name='username'
					required
				/>
			</div>
		<div className='form-row'>
			<div className='form-group col-md-6'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					className='form-control'
					id='email'
					placeholder='Email'
					value={user.email}
					onChange={handleChange}
					name='email'
					required
				/>
			</div>
		</div>
		</div>
		<button type='submit'>Submit</button>
		<Link to={`/user`} className='btn btn-link'>
			Cancel
		</Link>
	</form>
);

export default UserForm;
