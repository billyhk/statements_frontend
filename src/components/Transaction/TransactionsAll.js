import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';
// import Table from 'react-bootstrap/Table';

import './Transaction.css';
import '../User/User.css';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
	{ id: 'id', label: 'ID', minWidth: 170 },
	{ id: 'transaction_type', label: 'Transaction Type', minWidth: 100 },
	{ id: 'description', label: 'Description', minWidth: 100 },
	{ id: 'accounting_date', label: 'Accounting Date', minWidth: 100 },
];

const useStyles = makeStyles({
	root: {
		width: '90vw',
		margin: '5vmin',
		background: 'rgb(220, 229, 237)',
	},
	container: {
		height: 'auto',
		background: 'rgb(220, 229, 237)',
	},
});

const TransactionsAll = (props) => {
	const [transactions, setTransactions] = useState([]);
	const [error, setError] = useState(false);
	const classes = useStyles();

	// Material UI
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// Fetch to GET from API
	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		await fetch(`${APIURL}/api/transaction`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${props.userToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setTransactions(data);
			})
			.catch(() => {
				setError(true);
			});
	}

	if(!transactions) {
		return <div className='home-title'>Loading...</div>;
	}

	return (
		<div className='user-account-wrapper'>
			<p className='user-detail-header'>
				Transaction History
				<Link to='/user/new-transaction'> (+)</Link>
			</p>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead id='transaction-detail-headers'>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{transactions
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((transaction) => {
									return (
										<TableRow
											hover
											role='checkbox'
											tabIndex={-1}
											key={transaction.id}>
											{columns.map((column) => {
												const value = transaction[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === 'number' ? (
															column.format(value)
														) : column.id === 'transaction_type' ? (
															<Link
																to={`transaction/${transaction.id}`}
																>
																{props.toTitleCase(transaction.transaction_type)}
															</Link>
														) : (
															value
														)}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={transactions.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default TransactionsAll;
