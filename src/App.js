import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// components
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SignIn from './components/Password/SignIn';
import SignUp from './components/Password/SignUp';
import User from './components/User/UserDetail';

const App = () => {
	const [token, setToken] = useState('');

	async function handleSignOut() {
		await setToken(null);
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
				{/* <Route
					exact
					path='/user/:emailId'
					render={(props) => {
						return <User userToken={token} />;
					}}
				/> */}
				<Route
					exact
					path='/user/:id'
					render={(routerProps) => {
						return (
							<User
								match={routerProps.match}
								userToken={token}
								handleSignOut={handleSignOut}
							/>
						);
					}}
				/>
			</main>
		</>
	);
};

export default App;
