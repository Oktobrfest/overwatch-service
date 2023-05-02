import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { AuthButton } from "../Auth";

const MainNavbar = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		<Container>
			<Navbar.Brand href="#home">Overwatch</Navbar.Brand>

			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link href="/dashboard">Dashboard</Nav.Link>
				</Nav>
				<Nav className="">
					<AuthButton></AuthButton>
				</Nav>
			</Navbar.Collapse>
		</Container>
		</Navbar>
	)
};

export default MainNavbar;