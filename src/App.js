import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// components
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SignIn from './components/Password/SignIn';
import SignUp from './components/Password/SignUp';
import UserDetail from './components/User/UserDetail';
import UserUpdate from './components/User/UserUpdate';
import TransactionCreate from './components/Transaction/TransactionCreate'

const App = () => {
	const [token, setToken] = useState('');

	async function handleSignOut() {
		await setToken(null);
	}
	function scrollUp() {
		window.scrollTo(0, 0);
	}

	return (
		<>
			<NavBar userToken={token} handleSignOut={handleSignOut} />
			<main>
				<Route exact path='/' component={Home} />
				<Route exact path='/signup' component={SignUp} />
				<Route
					exact
					path='/signin'
					render={(props) => {
						return <SignIn setToken={setToken} userToken={token} />;
					}}
				/>
				<Route
					exact
					path='/user'
					render={(routerProps) => {
						return (
							<UserDetail
								match={routerProps.match}
								userToken={token}
								handleSignOut={handleSignOut}
								scrollUp={scrollUp}
							/>
						);
					}}
				/>
				<Route
					exact
					path='/user/edit'
					render={(routerProps) => {
						return (
							<UserUpdate
								match={routerProps.match}
								userToken={token}
							/>
						);
					}}
				/>
				<Route exact path='/user/new-transaction' render={(routerProps) => {
					return (
						<TransactionCreate match={routerProps.match} userToken={token}/>
					)
				}} />
			</main>
		</>
	);
};

export default App;
