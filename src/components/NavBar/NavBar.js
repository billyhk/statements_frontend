import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const NavBar = ({ userToken, handleSignOut }) => {
	return (
		<div className='header-wrapper'>
			<Navbar expand='lg' className='header-nav'>
				<Navbar.Brand>
					<span className='header-title'>Statements</span>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='basic-navbar-nav'
					className='burger-btn'
				/>
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Link to='/'>
							<i className='fas fa-home'></i>
							<span className='toggle-hidden-nav' id='toggle-hidden-nav'>Home
							</span>
						</Link>
						{userToken ? (
							<>
								<Link to='/user/:id'>
									<i className='fas fa-user'></i>{' '}
									<span className='toggle-hidden-nav'>My Account</span>
								</Link>
								<Link to='/user/new-transaction'>
									<i className='fas fa-plus'></i>{' '}
									<span className='toggle-hidden-nav'>New Transaction</span>
								</Link>
								<Link to='/user/all-transactions'>
									<i className='fas fa-wallet'></i>{' '}
									<span className='toggle-hidden-nav'>All Transactions</span>
								</Link>
								<Link to='/user/balance-statement'>
									<i className='fas fa-receipt'></i>{' '}
									<span className='toggle-hidden-nav'>Balance Statement</span>
								</Link>
								<Link to='/' onClick={handleSignOut}>
									<i className='fas fa-lock-open'></i>{' '}
									<span className='toggle-hidden-nav'>SignOut</span>
								</Link>
							</>
						) : (
							<Link to='/signin'>
								<i className='fas fa-lock'></i>
								<span className='toggle-hidden-nav'>   Sign In</span>
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
