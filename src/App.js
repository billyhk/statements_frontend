import React, { useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

//misc. components
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

//signin/signup
import SignIn from './components/Password/SignIn';
import SignUp from './components/Password/SignUp';

//user
import UserDetail from './components/User/UserDetail';
import UserUpdate from './components/User/UserUpdate';

//transaction
import TransactionCreate from './components/Transaction/TransactionCreate';
import TransactionsAll from './components/Transaction/TransactionsAll';
import TransactionDetail from './components/Transaction/TransactionDetail';
import TransactionUpdate from './components/Transaction/TransactionUpdate';

//financial statements
import FinancialStatementSummary from './components/Statement/FinancialStatementSummary';

const App = () => {
	let history = useHistory();

	const [token, setToken] = useState('');
	// let token = localStorage.getItem('token')

	async function handleSignOut() {
		await setToken(null);
		localStorage.removeItem('token');
		// return <Redirect to={'/'} />;
		history.push('/');
	}
	function scrollUp() {
		window.scrollTo(0, 0);
	}
	// convert snake_case data to Title Case for form
	function toTitleCase(str) {
		return str
			.replace(/([a-z])([A-Z])/g, function (
				allMatches,
				firstMatch,
				secondMatch
			) {
				return firstMatch + ' ' + secondMatch;
			})
			.toLowerCase()
			.replace(/([ -_]|^)(.)/g, function (allMatches, firstMatch, secondMatch) {
				return (firstMatch ? ' ' : '') + secondMatch.toUpperCase();
			});
	}

	return (
		<>
			<Route
				path='*'
				render={() => {
					return <NavBar userToken={token} handleSignOut={handleSignOut} />;
				}}
			/>
			<main>
				<Route exact path='/' component={Home} />
				<Route exact path='/signup' component={SignUp} />
				<Route
					exact
					path='/signin'
					render={(props) => {
						return <SignIn setToken={setToken} />;
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
						return <UserUpdate match={routerProps.match} userToken={token} />;
					}}
				/>
				<Route
					exact
					path='/user/new-transaction'
					render={(routerProps) => {
						return (
							<TransactionCreate
								match={routerProps.match}
								userToken={token}
								toTitleCase={toTitleCase}
							/>
						);
					}}
				/>
				<Route
					exact
					path='/user/all-transactions'
					render={(routerProps) => {
						return (
							<TransactionsAll
								match={routerProps.match}
								userToken={token}
								toTitleCase={toTitleCase}
								scrollUp={scrollUp}
							/>
						);
					}}
				/>{' '}
				<Route
					exact
					path='/user/transaction/:id'
					render={(routerProps) => {
						return (
							<TransactionDetail
								{...routerProps}
								userToken={token}
								toTitleCase={toTitleCase}
								scrollUp={scrollUp}
							/>
						);
					}}
				/>{' '}
				<Route
					exact
					path='/user/transaction/:id/edit'
					render={(routerProps) => {
						return (
							<TransactionUpdate
								match={routerProps.match}
								userToken={token}
								toTitleCase={toTitleCase}
								scrollUp={scrollUp}
								{...routerProps}
							/>
						);
					}}
				/>
				<Route
					exact
					path='/user/financial-statements-summary'
					render={(routerProps) => {
						return (
							<FinancialStatementSummary
								match={routerProps.match}
								userToken={token}
								toTitleCase={toTitleCase}
								scrollUp={scrollUp}
								{...routerProps}
							/>
						);
					}}
				/>
			</main>
			<footer>
				<Route path='*' component={Footer} />
			</footer>
		</>
	);
};

export default App;
