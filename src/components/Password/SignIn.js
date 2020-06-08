import React, { Component } from 'react';
import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './Password.css';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			redirectToReferrer: false,
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	signIn = (event) => {
		event.preventDefault();
		fetch(`${APIURL}/api/users/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res.token);
				this.props.setToken(res.token);
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
							<p className='h4 text-center mb-4'>Sign in</p>
							<label htmlFor='defaultFormLoginEmailEx' className='sign-in-text'>
								Your email
							</label>
							<input
								type='email'
								id='email'
								className='form-control'
								name='email'
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<br />
							<label
								htmlFor='defaultFormLoginPasswordEx'
								className='sign-in-text'>
								Your password
							</label>
							<input
								type='password'
								id='password'
								className='form-control'
								name='password'
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<div className='text-center mt-4'>
								<MDBBtn color='indigo' onClick={this.signIn}>
									Login
								</MDBBtn>
								<Link to='/signup' className='button-text'>
									<MDBBtn color='indigo'>Sign Up</MDBBtn>
								</Link>
							</div>
						</form>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default SignIn;
