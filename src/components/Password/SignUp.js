import React, { Component } from 'react';
import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './Password.css';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			passwordConfirm: '',
			valid: true,
			submit: false,
			redirectToReferrer: false,
		};
	}

	checkPassword = (event) => {
        event.preventDefault();
		if(this.state.password === this.state.passwordConfirm)
            {
                this.setState({ valid: true, submit: true });
                this.handleSubmit()
        } else {
                this.setState({ valid: false, submit: true })
            };
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const url = `${APIURL}/api/users`;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				email: this.state.email,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				this.setState({ ...this.state, redirectToReferrer: true });
			});
	};

	render() {
		const { redirectToReferrer } = this.state;
		if (redirectToReferrer) {
			return <Redirect to='/user/:id' />;
		}

		return (
			<MDBContainer>
				<MDBRow>
					<MDBCol md='12'>
						<form onSubmit={this.checkPassword}>
							<p className='h4 text-center mb-4'>Sign up</p>
							<label htmlFor='firstname' className='sign-in-text'>
								First Name
							</label>
							<input
                                required
								className='form-control'
								type='text'
								id='firstname'
								name='firstname'
								value={this.state.firstname}
								onChange={this.handleChange}
							/>
							<br />
							<label htmlFor='lastname' className='sign-in-text'>
								Last Name
							</label>
							<input
                                required
								className='form-control'
								type='text'
								id='lastname'
								name='lastname'
								value={this.state.lastname}
								onChange={this.handleChange}
							/>
							<br />
							<label htmlFor='email' className='sign-in-text'>
								Email
							</label>
							<input
                                required
								className='form-control'
								type='email'
								id='email'
								name='email'
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<br />
							<label htmlFor='password' className='sign-in-text'>
								Password
							</label>
							<input
                                required
								className='form-control'
								type='password'
								id='password'
								name='password'
								value={this.state.password}
								onChange={this.handleChange}
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
								value={this.state.passwordConfirm}
								onChange={this.handleChange}
							/>
							<br />

							<div className='text-center mt-4'>
								<MDBBtn color='indigo' type='submit'>
									Submit
								</MDBBtn>

								{this.state.submit && (
									<p className={this.state.valid ? 'valid' : 'invalid'}>
										{this.state.valid ? null : 'Passwords Must Match'}
									</p>
								)}
								{!this.state.submit}

							</div>
						</form>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default SignUp;
