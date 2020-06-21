import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import {
	FaHome,
	FaLock,
	FaUser,
	FaPlus,
	FaWallet,
	FaReceipt,
	FaLockOpen,
} from 'react-icons/fa';

import '../../index.css';

const NavBar = ({ userToken, handleSignOut }) => {
	const [expanded, setExpanded] = useState();

	// useEffect(() => {
	// 	return (userToken = localStorage.getItem('token'));
	// });

	function closeNav() {
		if (!expanded) {
			setExpanded(true);
		} else {
			setExpanded(false);
		}
	}
	function openNav() {
		if (expanded) {
			setExpanded(false);
		} else {
			setExpanded(true);
		}
	}

	return (
		<div className='header-wrapper'>
			<Navbar
				expand='lg'
				className='header-nav'
				onToggle={openNav}
				expanded={expanded}>
				<Navbar.Brand>
					<span className='header-title'>Statements</span>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='basic-navbar-nav'
					className='burger-btn'
					onClick={openNav}
				/>
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto' onClick={closeNav}>
						<Link to='/'>
							<FaHome />{' '}
							<span className='toggle-hidden-nav' id='toggle-hidden-nav'>
								Home
							</span>
						</Link>
						{userToken ? (
							<>
								<Link to='/user'>
									<FaUser />{' '}
									<span className='toggle-hidden-nav'>My Account</span>
								</Link>
								<Link to='/user/new-transaction'>
									<FaPlus />{' '}
									<span className='toggle-hidden-nav'>New Transaction</span>
								</Link>
								<Link to='/user/all-transactions'>
									<FaWallet />{' '}
									<span className='toggle-hidden-nav'>All Transactions</span>
								</Link>
								<Link to='/user/financial-statements-summary'>
									<FaReceipt />{' '}
									<span className='toggle-hidden-nav'>
										Financial Statements
									</span>
								</Link>
								<Link to='/' onClick={handleSignOut}>
									<FaLockOpen />{' '}
									<span className='toggle-hidden-nav'>SignOut</span>
								</Link>
							</>
						) : (
							<Link to='/signin'>
								<FaLock />
								<span className='toggle-hidden-nav'> Sign In</span>
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
