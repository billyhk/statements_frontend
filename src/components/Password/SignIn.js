import React, { Component } from 'react';
import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './Password.css';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			redirectToReferrer: false,
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	signIn = (event) => {
		event.preventDefault();
		fetch(`${APIURL}/api/token/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res.access);
				if (res.access) {
					this.props.setToken(res.access);
					this.setState({ ...this.state, redirectToReferrer: true });
				} else {
					alert("User information is incorrect.")
				}
			})
			.catch(console.error);
	};

	render() {
		const { redirectToReferrer } = this.state;
		if (redirectToReferrer) {
			return <Redirect to='/user' />;
		}

		return (
			<MDBContainer>
				<MDBRow>
					<MDBCol md='12'>
						<form onSubmit={this.checkPassword}>
							<p className='h4 text-center mb-4'>Sign in</p>
							<label htmlFor='username' className='sign-in-text'>
								Your username
							</label>
							<input
								type='username'
								id='username'
								className='form-control'
								name='username'
								value={this.state.username}
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
