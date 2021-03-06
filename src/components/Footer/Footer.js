import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

const FooterPage = () => {
	return (
		<MDBFooter className='font-small pt-4 mt-4'>
			<MDBContainer fluid className='text-center text-md-left'>
				<MDBRow>
					<MDBCol md='6'>
						<h5 className='title'>Thank you for visiting</h5>
						<p>Made with love and fiscal responsibility.</p>
					</MDBCol>
					<MDBCol md='6'>
						<h5 className='title'>LinkedIn</h5>
						<ul>
							<li className='list-unstyled'>
								<a href='https://www.linkedin.com/in/williamhkaufman/'>
									Billy Kaufman
								</a>
							</li>
							<li className='list-unstyled'>
								<a href='https://www.linkedin.com/in/trentlehmann/'>
									Trent Lehmann
								</a>
							</li>
						</ul>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			<div className='footer-copyright text-center py-3'>
				<MDBContainer fluid>
					&copy; {new Date().getFullYear()} Copyright:{' '}
					<a href='#'> {`Kaufman \& Lehmann`} </a>
				</MDBContainer>
			</div>
		</MDBFooter>
	);
};

export default FooterPage;
