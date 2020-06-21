import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import './Modal.css';

const Modal = (props) => {
	console.log(props.tr_list);
	return props.isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className='modal-overlay' />
					<div
						className='modal-wrapper'
						aria-modal
						aria-hidden
						tabIndex={-1}
						role='dialog'>
						<div id='modal'>
							<div className='modal-header'>
								<button
									type='button'
									className='modal-close-button'
									data-dismiss='modal'
									aria-label='Close'
									onClick={props.hide}>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							{!props.tr_list ? (
								<p>This field does not have any associated transactions.</p>
							) : (
								props.tr_list
							)}
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default Modal;
